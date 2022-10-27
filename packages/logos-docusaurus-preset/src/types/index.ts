import { Config } from '@docusaurus/types'
import { PresetConfig } from './preset'

export type PluginOptions = PresetConfig
export type SiteConfig = Partial<Config>

export * from './preset'
export * from './status'
export * from './themes'
