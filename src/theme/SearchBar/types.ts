export type SearchDocument = {
  id: string
  title: string
  url: string
  hash?: string
  parentId?: string
  breadcrumb?: string
  sectionTitle?: string
}

export enum SearchDocumentType {
  Title = 'title',
  Heading = 'heading',
  Paragraph = 'paragraph',
}

export type SearchResultBase = {
  document: SearchDocument
  type: SearchDocumentType
  page: SearchDocument | undefined | false
  metadata: MatchMetadata
  tokens: string[]
  highlighted: string
}

export type SearchResultExtra = {
  score: number
  index: number
  isInterOfTree: boolean
  isLastOfTree: boolean
}

export type SearchResult = SearchResultBase & SearchResultExtra

export type MetadataPosition = [number, number]

export interface MatchMetadata {
  [token: string]: {
    [field: string]: {
      position: MetadataPosition[]
    }
  }
}

// Grouped

export type SearchResultGroupItem = {
  type: SearchResult['type']
  url: string
  hash: string
  href: string
  title: string
  score: number
  content: string
}

export type SearchResultGroupItemWithCategory = SearchResultGroupItem & {
  category: string
}

export type GroupedSearchResult = [string, SearchResultGroupItem[]][]
