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
        level: 0,
        url,
        hash,
        href,
        score,
        title: highlighted,
        content: '',
        category: document.breadcrumb!?.[1] ?? document.title ?? '',
      }
    }

    case SearchDocumentType.Heading: {
      const p = page as any as SearchDocument

      return {
        type,
        level: 1,
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
        level: 2,
        url,
        hash,
        href,
        score,
        title: document.sectionTitle || document.title || '',
        content: highlighted,
        category: p?.breadcrumb?.[1] ?? p?.title ?? '',
      }
    }
  }
}

export const groupSearchResult = (
  results: SearchResult[],
): GroupedSearchResult => {
  const grouped = Object.entries(
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
        .map(([url, value]) => {
          let items: SearchResultGroupItem[] = [...value].sort((a, b) =>
            a.type === SearchDocumentType.Title
              ? -1
              : a.score > b.score
              ? -1
              : 1,
          )

          const hasTitle = items[0]?.type === SearchDocumentType.Title

          items = hasTitle
            ? items.filter(
                (item) =>
                  !(
                    item.type === SearchDocumentType.Heading && item.hash === ''
                  ),
              )
            : items

          items = items.map((item, index) => ({
            ...item,
            level: hasTitle ? (index === 0 ? 0 : 1) : 0,
          }))

          return [url, items] as [string, SearchResultGroupItem[]]
        })
        .sort((a, b) =>
          (a[1][0]?.score ?? 0) > (b[1][0]?.score ?? 0) ? -1 : 1,
        )
        .flatMap(([url, items]) => items),
    ])

  return grouped as GroupedSearchResult
}
