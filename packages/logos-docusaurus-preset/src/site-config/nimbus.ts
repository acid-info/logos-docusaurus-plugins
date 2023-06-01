import { SiteConfig } from '../index'
import { BusinessUnits } from '../types'
import baseSiteConfig from './base'

export const nimbusSiteConfig: SiteConfig = {
  ...baseSiteConfig,
  title: 'Nimbus',
  tagline:
    'Nimbus is a client implementation that strives to be as lightweight as possible in terms of resources used. This allows it to perform well on embedded systems, resource-restricted devices -- including Raspberry Pis and mobile devices -- and multi-purpose servers.',
  url: 'https://nimbus.team',
  customFields: {
    businessUnits: BusinessUnits.Nimbus,
  },
}

export default nimbusSiteConfig
