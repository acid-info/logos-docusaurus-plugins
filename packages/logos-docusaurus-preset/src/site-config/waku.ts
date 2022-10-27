import { SiteConfig } from '../index'
import { BusinessUnits } from '../types'
import baseSiteConfig from './base'

export const wakuSiteConfig: SiteConfig = {
  ...baseSiteConfig,
  title: 'Waku',
  tagline:
    'Waku is the communication layer for Web3. Decentralized communication that scales.',
  url: 'https://waku.org',
  customFields: {
    businessUnits: BusinessUnits.Waku,
  },
}

export default wakuSiteConfig
