import {
  ThemeConfig as DocusaurusThemeConfig,
  Footer,
} from '@docusaurus/theme-common'

export type ThemeConfig = Omit<DocusaurusThemeConfig, 'footer'> & {
  footer?: Omit<Footer, 'style'>
}

export type { ThemeOptions as DefaultThemeOptions } from '@acid-info/logos-docusaurus-theme'
