import { SiteConfig } from '../index'
import baseSiteConfig from './base'

export const wakuSiteConfig: SiteConfig = {
  ...baseSiteConfig,
  title: 'Waku',
  tagline:
    'Waku is the communication layer for Web3. Decentralized communication that scales.',
  url: 'https://waku.org',
}

export default wakuSiteConfig
