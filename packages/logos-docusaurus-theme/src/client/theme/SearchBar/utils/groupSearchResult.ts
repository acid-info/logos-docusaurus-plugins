import groupBy from 'lodash/groupBy'
import omit from 'lodash/omit'
import {
  GroupedSearchResult,
  SearchDocument,
  SearchDocumentType,
  SearchResult,
  SearchResultGroupItem,
  SearchResultGroupItemWithCategory,
} from '../types'

const convertSearchResult = (
  item: SearchResult,
): SearchResultGroupItemWithCategory => {
  const { type, document, page, highlighted, score } = item
  const { url, hash = '' } = document
  const href = url + hash

  switch (type) {
    case SearchDocumentType.Title: {
      return {
        type,
        url,
        hash,
        href,
        score,
        title: highlighted,
        content: '',
        category: document.breadcrumb!?.[1] ?? document.title,
      }
    }

    case SearchDocumentType.Heading: {
      const p = page as any as SearchDocument

      return {
        type,
        url,
        hash,
        href,
        score,
        title: highlighted,
        content: '',
        category: p?.breadcrumb?.[1] ?? p?.title ?? '',
      }
    }

    case SearchDocumentType.Paragraph: {
      const p = page as any as SearchDocument

      return {
        type,
        url,
        hash,
        href,
        score,
        title: document.sectionTitle ?? '',
        content: highlighted,
        category: p?.breadcrumb?.[1] ?? p?.title ?? '',
      }
    }
  }
}

export const groupSearchResult = (
  results: SearchResult[],
): GroupedSearchResult =>
  Object.entries(
    groupBy(
      results.map((item) => convertSearchResult(item)),
      'category',
    ),
  )
    .map(
      ([key, items]) =>
        [
          key,
          items
            .map((item) => omit(item, 'category'))
            .sort((a, b) => (a.score > b.score ? -1 : 1)),
        ] as [string, SearchResultGroupItem[]],
    )
    .sort((a, b) => ((a[1][0]?.score ?? 0) > (b[1][0]?.score ?? 0) ? -1 : 1))
    .map(([category, items]) => [
      category,
      Object.entries(groupBy(items, 'url'))
        .map(
          ([url, items]) =>
            [
              url,
              items.sort((a, b) =>
                a.type === SearchDocumentType.Title
                  ? -1
                  : a.score > b.score
                  ? -1
                  : 1,
              ),
            ] as [string, SearchResultGroupItem[]],
        )
        .sort((a, b) =>
          (a[1][0]?.score ?? 0) > (b[1][0]?.score ?? 0) ? -1 : 1,
        )
        .flatMap(([url, items]) => items),
    ])
