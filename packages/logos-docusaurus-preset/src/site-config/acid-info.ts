import { SiteConfig } from '../index'
import { BusinessUnits } from '../types'
import baseSiteConfig from './base'

export const acidInfoSiteConfig: SiteConfig = {
  ...baseSiteConfig,
  title: 'Acid.info',
  tagline: 'The future is a second enlightenment of the digital world.',
  url: 'https://acid.info',
  customFields: {
    businessUnits: BusinessUnits.AcidInfo,
  },
}

export default acidInfoSiteConfig
