import { BusinessUnits, SiteConfig } from '../types/index'
import { codexSiteConfig } from './codex'
import logosSiteConfig from './logos'
import nimbusSiteConfig from './nimbus'
import wakuSiteConfig from './waku'

export const siteConfigs: Record<BusinessUnits, SiteConfig> = {
  [BusinessUnits.Logos]: logosSiteConfig,
  [BusinessUnits.Codex]: codexSiteConfig,
  [BusinessUnits.Waku]: wakuSiteConfig,
  [BusinessUnits.Nimbus]: nimbusSiteConfig,
}
