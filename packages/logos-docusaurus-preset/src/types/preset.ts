import { PluginOptions as DocPluginOptions } from '@docusaurus/plugin-content-docs'
import { DefaultThemeOptions } from './themes'

export enum ThemeNames {
  Default = 'default',
}

export enum BusinessUnits {
  Logos = 'Logos',
  Codex = 'Codex',
  Waku = 'Waku',
}

export type PresetConfig = {
  businessUnit: BusinessUnits
  theme?: {
    name: ThemeNames.Default
    options?: DefaultThemeOptions
  }

  docs?: Partial<DocPluginOptions>
}
