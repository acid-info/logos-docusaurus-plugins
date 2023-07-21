import { PluginOptions as DocPluginOptions } from '@docusaurus/plugin-content-docs'
import { DefaultThemeOptions } from './themes'
import { PluginOptions as OpenGraphPluginOptions } from '@acid-info/docusaurus-og'

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
  AFAIKInstitute = 'AFAIK Institute',
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
  docs?: Partial<DocPluginOptions>
  localSearch?: LocalSearchConfig
  og?: Partial<Omit<OpenGraphPluginOptions, 'imageRenderers'>> | false
}
