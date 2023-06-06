import { ThemeConfig } from '@docusaurus/preset-classic'
import { BusinessUnits } from '../types'
import { defaultsDeep } from '../utils/object.utils'
import baseThemeConfig from './base'
import codexThemeConfig from './codex'
import logosThemeConfig from './logos'
import nimbusThemeConfig from './nimbus'
import nomosThemeConfig from './nomos'
import vacResearchThemeConfig from './vac-research'
import wakuThemeConfig from './waku'

const merge =
  (base: ThemeConfig) =>
  (config: ThemeConfig): ThemeConfig => {
    const merged: ThemeConfig = {
      ...(defaultsDeep([{}, config, base], false) as ThemeConfig),
    }

    return {
      ...merged,
      footer: {
        ...merged.footer,
        links: [
          ...(merged.footer?.links ?? []),
          ...(baseThemeConfig.footer?.links ?? []),
        ],
      },
    }
  }

export const themeConfigs: Record<BusinessUnits, ReturnType<typeof merge>> = {
  [BusinessUnits.Logos]: merge(logosThemeConfig),
  [BusinessUnits.Codex]: merge(codexThemeConfig),
  [BusinessUnits.Waku]: merge(wakuThemeConfig),
  [BusinessUnits.Nimbus]: merge(nimbusThemeConfig),
  [BusinessUnits.Nomos]: merge(nomosThemeConfig),
  [BusinessUnits.VacResearch]: merge(vacResearchThemeConfig),
}
