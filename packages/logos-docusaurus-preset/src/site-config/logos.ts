import { SiteConfig } from '../index'
import { BusinessUnits } from '../types'
import baseSiteConfig from './base'

export const logosSiteConfig: SiteConfig = {
  ...baseSiteConfig,
  title: 'Logos Network State',
  tagline:
    'Logos is a grassroots movement to provide trust-minimized, corruption resistant governing services and social institutions to underserved citizens.',
  url: 'https://logos.co',
  customFields: {
    businessUnits: BusinessUnits.Logos,
  },
}

export default logosSiteConfig
