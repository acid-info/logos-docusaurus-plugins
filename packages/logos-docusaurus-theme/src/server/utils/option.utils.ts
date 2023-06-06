import { LoadContext } from '@docusaurus/types'
import _ from 'lodash'
import type { DocConfig, ThemeOptions } from '../../client/types/theme.types'

export const getDocConfig = (
  context: LoadContext,
  pluginId: string,
): DocConfig => {
  const themeOptions = _.get(
    context,
    'siteConfig.customFields.logos-docusaurus-theme',
    {},
  ) as ThemeOptions

  return themeOptions?.docs?.[pluginId] ?? {}
}
