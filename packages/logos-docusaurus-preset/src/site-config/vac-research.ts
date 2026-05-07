import { SiteConfig } from '../index'
import { BusinessUnits } from '../types'
import baseSiteConfig from './base'

export const vacResearchSiteConfig: SiteConfig = {
  ...baseSiteConfig,
  title: 'Logos Research',
  tagline: 'Logos Research - Communication, Privacy, Etc.',
  url: 'https://research.logos.co',
  customFields: {
    businessUnits: BusinessUnits.VacResearch,
  },
}

export default vacResearchSiteConfig
