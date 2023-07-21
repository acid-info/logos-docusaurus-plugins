import { SiteConfig } from '../index'
import { BusinessUnits } from '../types'
import baseSiteConfig from './base'

export const afaikInstituteSiteConfig: SiteConfig = {
  ...baseSiteConfig,
  title: 'AFAIK Institute',
  tagline:
    'A research lab for experimentation across our movement and idealistic world building. The institute is a sandbox for pilot projects for the future Logos tech stack and network state.',
  url: 'https://afaik.institute/',
  customFields: {
    businessUnits: BusinessUnits.AFAIKInstitute,
  },
}

export default afaikInstituteSiteConfig
