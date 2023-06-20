import { GlobalTypographyStyles } from '@acid-info/lsd-react'
import type { PluginOptions as DefaultPluginOptions } from '@docusaurus/theme-classic'

export type Author = {
  key: string
  name: string
  github?: string
  twitter?: string
  website?: string
}

export type AuthorPageConfig = {
  sidebar?: string
}

export type DocContent = {
  authors?: Author[]
  authorPage?: AuthorPageConfig | boolean
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
  typography?: GlobalTypographyStyles
}
