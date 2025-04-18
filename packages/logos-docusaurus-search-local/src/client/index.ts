import {
  SearchDocument,
  SearchDocumentType,
  SearchResult,
} from '@easyops-cn/docusaurus-search-local/dist/client/shared/interfaces'

import {
  fetchIndexesByWorker,
  searchByWorker,
} from '@easyops-cn/docusaurus-search-local/dist/client/client/theme/searchByWorker'

import { getStemmedPositions } from '@easyops-cn/docusaurus-search-local/dist/client/client/utils/getStemmedPositions'
import { highlightStemmed } from '@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlightStemmed'
import * as proxied from '@easyops-cn/docusaurus-search-local/dist/client/client/utils/proxiedGenerated'

export enum ResultType {
  Title = 'title',
  Heading = 'heading',
  Paragraph = 'paragraph',
}

export type SearchConfig = {
  resultsLimit: number
  preferredVersionPath: string
  searchContextByPaths?: string | string[]
}

export const createPromise = <T = any>() => {
  let resolve: (value: T) => void
  let reject: (reason?: any) => void

  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  const callback = (data: T, error?: Error): void => {
    if (error) {
      reject(error)
    } else {
      resolve(data)
    }
  }

  return { promise, callback, resolve: resolve!, reject: reject! }
}

class Search {
  public loading = false
  public baseUrl: string
  public searchContextByPaths: string | string[]
  private source:
    | ((input: string, callback: (result: SearchResult[]) => void) => void)
    | null = null

  constructor(private config: SearchConfig) {
    this.baseUrl = config.preferredVersionPath
    this.searchContextByPaths = config.searchContextByPaths ?? ''
  }

  init = async () => {
    if (this.loading) return
    this.loading = true

    await fetchIndexesByWorker(this.baseUrl, this.searchContextByPaths)

    this.source = async (
      input: string,
      callback: (output: SearchResult[]) => void,
    ) => {
      const result = await searchByWorker(
        this.baseUrl,
        this.searchContextByPaths,
        input,
        this.config.resultsLimit,
      )
      callback(result)
    }

    this.loading = false
  }

  query = async (input: string) => {
    if (!this.source)
      throw new Error('Search not initialized. Call init() first.')

    const { promise, callback } = createPromise<SearchResult[]>()
    this.source(input, callback)
    const raw = await promise

    return {
      results: raw.map((r) => this.formatResult(r)),
    }
  }

  private formatResult = (result: SearchResult) => {
    const doc = result.document || result.page!
    return {
      ...result,
      type: this.resultTypeToString(result.type),
      page: result.page ? this.formatDocument(result.page) : null,
      document: result.document ? this.formatDocument(result.document) : null,
      highlighted: highlightStemmed(
        doc.t,
        getStemmedPositions(result.metadata, 't'),
        result.tokens,
      ),
    }
  }

  private resultTypeToString = (type: SearchDocumentType) =>
    ({
      [SearchDocumentType.Title]: ResultType.Title,
      [SearchDocumentType.Heading]: ResultType.Heading,
      [SearchDocumentType.Paragraph]: ResultType.Paragraph,
    }[type])

  private formatDocument = (doc: SearchDocument) => ({
    id: doc.i,
    title: doc.t,
    url: doc.u,
    hash: doc.h,
    parentId: doc.p,
    breadcrumb: doc.b,
    sectionTitle: doc.s,
  })
}

const main = async () => {
  if (typeof window === 'undefined') return
  const win = window as any

  win.getProxiedGeneratedData = () => proxied

  win.createSearchInstance = async (config: SearchConfig) => {
    const search = new Search(config)
    await search.init()

    return search
  }
}

main()
