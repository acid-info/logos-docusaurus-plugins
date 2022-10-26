import { BusinessUnits, SiteConfig } from '../types/index'
import { codexSiteConfig } from './codex'
import wakuSiteConfig from './waku'

export const siteConfigs: Record<BusinessUnits, SiteConfig> = {
  [BusinessUnits.Codex]: codexSiteConfig,
  [BusinessUnits.Waku]: wakuSiteConfig,
}
