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

const loadIndex = async (params: {
  versionUrl: string
  searchContext: string
}) => {
  const result = await fetchIndexesByWorker(
    params.versionUrl,
    params.searchContext,
  )

  console.log('loadIndex', result)

  return result
}

const findSearchContext = ({
  versionUrl,
  searchContextByPaths,
}: {
  versionUrl: string
  searchContextByPaths: string | string[]
}): string => {
  let pathname = window.location.pathname
  pathname = pathname.endsWith('/') ? pathname : pathname + '/'

  if (!Array.isArray(searchContextByPaths) || !pathname.startsWith(versionUrl))
    return ''

  const uri = pathname.substring(versionUrl.length)
  const paths = searchContextByPaths as string[]

  return paths.find((path) => uri === path || uri.startsWith(`${path}/`)) ?? ''
}

class Search {
  public loading = false
  public baseUrl: string
  public searchContextByPaths: string | string[]

  public source:
    | ((input: string, callback: (result: SearchResult[]) => void) => void)
    | null = null

  constructor(private config: SearchConfig) {
    this.baseUrl = config.preferredVersionPath
    this.searchContextByPaths = config.searchContextByPaths ?? ''
  }

  init = async () => {
    this.loading = true

    const result = await loadIndex({
      versionUrl: this.baseUrl,
      searchContext: findSearchContext({
        versionUrl: this.baseUrl,
        searchContextByPaths: this.searchContextByPaths,
      }),
    })

    console.log('init', result)

    this.source = async (
      input: string,
      callback: (output: SearchResult[]) => void,
    ) => {
      const result = await searchByWorker(
        this.baseUrl,
        this.searchContextByPaths,
        input,
        50,
      )
      callback(result)
    }
  }

  query = async (input: string) => {
    if (!this.source) throw new Error('Not initialized')

    const { promise, callback } = createPromise<SearchResult[]>()

    this.source && this.source(input, callback)

    return {
      results: (await promise).map((result) => this.formatResult(result)),
    }
  }

  formatResult = (result: SearchResult) => {
    return {
      ...result,
      type: this.resultTypeToString(result.type),
      page: result.page ? this.formatDocument(result.page) : null,
      document: result.document ? this.formatDocument(result.document) : null,
      highlighted: highlightStemmed(
        result.document.t,
        getStemmedPositions(result.metadata, 't'),
        result.tokens,
      ),
    }
  }

  resultTypeToString = (type: SearchDocumentType) =>
    ({ 0: ResultType.Title, 1: ResultType.Heading, 2: ResultType.Paragraph }[
      type as number
    ])

  formatDocument = (doc: SearchDocument) => {
    return {
      id: doc.i,
      title: doc.t,
      url: doc.u,
      hash: doc.h,
      parentId: doc.p,
      breadcrumb: doc.b,
      sectionTitle: doc.s,
    }
  }
}

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
  let resolve: any, reject: any

  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  const callback = (data: T, error?: Error): void => {
    if (error) return void reject(error)
    resolve(data)
  }

  return {
    reject,
    resolve,
    promise,

    callback,
  }
}

const main = async () => {
  if (typeof window === 'undefined') return

  const win = window as any

  win.getProxiedGeneratedData = () => proxied

  win.createSearchInstance = async (config: SearchConfig) => {
    const search = new Search(config)

    return search
  }
}

main()
