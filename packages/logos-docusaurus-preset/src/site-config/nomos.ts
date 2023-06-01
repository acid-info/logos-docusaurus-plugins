import { SiteConfig } from '../index'
import { BusinessUnits } from '../types'
import baseSiteConfig from './base'

export const nomosSiteConfig: SiteConfig = {
  ...baseSiteConfig,
  title: 'Nomos',
  tagline: '',
  url: 'https://nomos.co',
  customFields: {
    businessUnits: BusinessUnits.Nomos,
  },
}

export default nomosSiteConfig
