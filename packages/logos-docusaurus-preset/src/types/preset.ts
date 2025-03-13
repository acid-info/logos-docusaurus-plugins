import { PluginOptions as OpenGraphPluginOptions } from '@acid-info/docusaurus-og'
import { PluginOptions as BlogPluginOptions } from '@docusaurus/plugin-content-blog'
import { PluginOptions as DocPluginOptions } from '@docusaurus/plugin-content-docs'
import { PluginOptions as PagesPluginOptions } from '@docusaurus/plugin-content-pages'
import { GeneratedDataPluginConfig } from '../plugins/generatedData.plugin'
import { DefaultThemeOptions } from './themes'

export enum ThemeNames {
  Default = 'default',
  DocusaurusDefault = 'docusaurus-default',
}

export enum BusinessUnits {
  Logos = 'Logos',
  Codex = 'Codex',
  Waku = 'Waku',
  Nimbus = 'Nimbus',
  Nomos = 'Nomos',
  VacResearch = 'VacResearch',
  AcidInfo = 'Acid.info',
}

export type Contact = {
  name: string
  image: string
  contact?: {
    email: string | null
    status: string | null
    github: string | null
    discord: string | null
    gscholar: string | null
  }
}

export type ContactInfo = Contact[]

export type LocalSearchConfig = {
  singleIndex?: boolean
  blogDir?: string | string[]
  blogRouteBasePath?: string | string[]
}

export type PresetConfig = {
  businessUnit: BusinessUnits
  contactInfo?: string
  theme?:
    | {
        name: ThemeNames.Default
        options?: DefaultThemeOptions
      }
    | {
        name: ThemeNames.DocusaurusDefault
        options?: DefaultThemeOptions
      }
  customSiteConfig?: boolean
  docs?: Partial<DocPluginOptions> | false
  blog?: Partial<BlogPluginOptions> | false
  pages?: Partial<PagesPluginOptions> | false
  localSearch?: LocalSearchConfig
  og?: Partial<Omit<OpenGraphPluginOptions, 'imageRenderers'>> | false
  generated?: GeneratedDataPluginConfig
}
