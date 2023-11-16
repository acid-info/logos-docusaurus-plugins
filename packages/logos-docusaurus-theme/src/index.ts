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
      if (options.newsletterSubscription)
        args.actions.addRoute({
          path: options.newsletterSubscription.pagePath || '/subscribe',
          component: path.resolve(
            __dirname,
            '../src/client/theme/SubscriptionPage',
          ),
          exact: true,
        })
    },

    injectHtmlTags: ({}) => {
      return {
        headTags: [
          {
            tagName: 'link',
            attributes: {
              rel: 'alternate icon',
              type: 'image/png',
              href: '/theme/image/favicon.png',
            },
          },
          {
            tagName: 'link',
            attributes: {
              rel: 'icon',
              type: 'image/svg+xml',
              href: '/theme/image/favicon.svg',
            },
          },
        ],
      }
    },
  }
}

export { validateOptions } from './server/utils/validateOptions'
export type { ThemeOptions }
