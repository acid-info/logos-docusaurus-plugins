export type DocConfig = {
  sidebar?: {
    hide?: boolean
  }
}

export type ThemeOptions = {
  docs?: Record<string, DocConfig>
}
