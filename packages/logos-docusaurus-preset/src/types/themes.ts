import { NavbarItem, Footer } from '@docusaurus/theme-common'

export type ThemeConfig = {
  navbar?: {
    items?: NavbarItem[]
  }
  footer?: {
    links?: Footer['links']
  }
}

export type { PluginOptions as DefaultThemeOptions } from '@acid-info/logos-docusaurus-theme'
