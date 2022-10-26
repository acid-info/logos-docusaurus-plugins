import { ThemeConfig } from '@docusaurus/types'
import { BusinessUnits } from '../types'
import codexThemeConfig from './codex'
import wakuThemeConfig from './waku'

export const themeConfigs: Record<BusinessUnits, ThemeConfig> = {
  [BusinessUnits.Codex]: codexThemeConfig,
  [BusinessUnits.Waku]: wakuThemeConfig,
}
