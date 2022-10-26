import { DefaultThemeOptions } from './themes'

export enum ThemeNames {
  Default = 'default',
}

export enum BusinessUnits {
  Codex = 'Codex',
  Waku = 'Waku',
}

export type PresetConfig = {
  businessUnit: BusinessUnits

  theme?: {
    name: ThemeNames.Default
    options?: DefaultThemeOptions
  }
}
