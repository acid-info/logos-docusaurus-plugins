import type { PluginOptions as DefaultPluginOptions } from '@docusaurus/theme-classic'

export type Author = {
  key: string
  name: string
  github?: string
  twitter?: string
  website?: string
}

export type DocContent = {
  authors?: Author[]
}

export type DocSidebarConfig = {
  hide?: boolean
}

export type DocConfig = {
  sidebar?: DocSidebarConfig
  content?: DocContent
}

export type ThemeOptions = DefaultPluginOptions & {
  docs?: Record<string, DocConfig>
}
