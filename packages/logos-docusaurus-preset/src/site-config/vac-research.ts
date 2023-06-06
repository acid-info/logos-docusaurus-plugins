import { SiteConfig } from '../index'
import { BusinessUnits } from '../types'
import baseSiteConfig from './base'

export const vacResearchSiteConfig: SiteConfig = {
  ...baseSiteConfig,
  title: 'Vac Research',
  tagline: 'Vac - Communication, Privacy, Etc.',
  url: 'https://vac.dev',
  customFields: {
    businessUnits: BusinessUnits.VacResearch,
  },
}

export default vacResearchSiteConfig
