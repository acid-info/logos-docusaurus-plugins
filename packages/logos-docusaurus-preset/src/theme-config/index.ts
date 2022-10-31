import { ThemeConfig } from '@docusaurus/types'
import { BusinessUnits } from '../types'
import codexThemeConfig from './codex'
import logosThemeConfig from './logos'
import wakuThemeConfig from './waku'

export const themeConfigs: Record<BusinessUnits, ThemeConfig> = {
  [BusinessUnits.Logos]: logosThemeConfig,
  [BusinessUnits.Codex]: codexThemeConfig,
  [BusinessUnits.Waku]: wakuThemeConfig,
}
