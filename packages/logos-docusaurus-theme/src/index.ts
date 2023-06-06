import type { LoadContext, Plugin } from '@docusaurus/types'
import _ from 'lodash'
import path from 'path'
import type { ThemeOptions } from './client/types/theme.types'
import { createAuthorRoutes } from './server/utils/author.utils'

export default function logosTheme(
  context: LoadContext,
  options: ThemeOptions,
): Plugin<any> {
  const clientModules: string[] = [
    path.resolve(__dirname, './client/css/custom.scss'),
  ]
  if (options.customCss) {
    if (typeof options.customCss === 'string')
      clientModules.push(options.customCss)
    else clientModules.push(...options.customCss)
  }

  context.siteConfig.staticDirectories = [
    ...(context.siteConfig.staticDirectories ?? []),
    path.join(__dirname, './client/static/'),
  ]

  context.siteConfig.customFields = {
    ...(context.siteConfig.customFields ?? {}),
    'logos-docusaurus-theme': {
      ...options,
      ...(_.get(
        context,
        'siteConfig.customFields.logos-docusaurus-theme',
        {},
      ) as object),
    },
  }

  return {
    name: 'logos-docusaurus-theme',

    getThemePath: () => path.resolve(__dirname, './client/theme'),

    getTypeScriptThemePath: () =>
      path.resolve(__dirname, '../src/client/theme'),

    getClientModules: () => clientModules,

    async contentLoaded(args) {
      await createAuthorRoutes(context, args)
    },
  }
}

export { validateOptions } from './server/utils/validateOptions'
export type { ThemeOptions }
