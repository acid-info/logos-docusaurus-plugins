import { SiteConfig } from '../index'
import { BusinessUnits } from '../types'
import baseSiteConfig from './base'

export const codexSiteConfig: SiteConfig = {
  ...baseSiteConfig,
  title: 'Codex',
  tagline: 'Codex is building a Decentralized Durability Engine',
  url: 'https://codex.storage',
  customFields: {
    businessUnit: BusinessUnits.Codex,
  },
}

export default codexSiteConfig
