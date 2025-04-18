import { PluginOptions as SearchPluginOptions } from '@acid-info/logos-docusaurus-search-local'
import classicPreset from '@docusaurus/preset-classic'
import type { LoadContext, PluginConfig, Preset } from '@docusaurus/types'
import * as path from 'path'
import { generatedDataPlugin } from './plugins/generatedData.plugin'
import { siteConfigs } from './site-config/index'
import { themeConfigs } from './theme-config/index'
import { PluginOptions, ThemeNames } from './types'
import { findDocInstances, validateDocPluginOptions } from './utils/docs.utils'
import { defaultsDeep } from './utils/object.utils'

const makeSearchPluginConfig = (
  plugins: PluginConfig[],
  options: PluginOptions,
): PluginConfig[] => {
  const singleIndex = options.localSearch?.singleIndex ?? true
  const blogDir = options.localSearch?.blogDir ?? ['blog']
  const blogRouteBasePath = options.localSearch?.blogRouteBasePath ?? ['/blog']

  const docs = findDocInstances(plugins).map((plugin) =>
    validateDocPluginOptions(plugin![1]),
  )

  const config = {
    hashed: true,
    indexDocs: true,
    indexBlog: true,
    indexPages: true,
    docsDir: docs.map((doc) => doc.path),
    docsRouteBasePath: docs.map((doc) => doc.routeBasePath),
    blogDir: blogDir,
    blogRouteBasePath: blogRouteBasePath,
  } as Partial<SearchPluginOptions>

  if (!singleIndex) {
    config.searchContextByPaths = docs.map(({ routeBasePath, path }) =>
      routeBasePath === '/'
        ? path
        : routeBasePath.startsWith('/')
        ? routeBasePath.slice(1)
        : routeBasePath,
    )
  }

  return [['@acid-info/logos-docusaurus-search-local', config]]
}

export default function logosPreset(
  context: LoadContext,
  options: PluginOptions,
): Preset {
  const docsEnabled = options.docs !== false

  const siteConfig: typeof context.siteConfig = defaultsDeep(
    options.customSiteConfig
      ? [{}, context.siteConfig, siteConfigs[options.businessUnit]]
      : [siteConfigs[options.businessUnit], context.siteConfig],
    false,
  )

  siteConfig.staticDirectories = [
    ...(siteConfig.staticDirectories ?? []),
    path.join(__dirname, '../static/common'),
    path.join(__dirname, '../static', options.businessUnit),
  ]

  siteConfig.themeConfig = themeConfigs[options.businessUnit](
    context.siteConfig.themeConfig,
  )

  Object.entries(siteConfig).forEach(
    ([key, value]) => (context.siteConfig[key] = value),
  )

  const { plugins = [], themes = [] } = classicPreset(context, {
    docs: docsEnabled
      ? {
          routeBasePath: '/',
          ...(options.docs ?? {}),
        }
      : false,
    blog: options.blog,
    pages: options.pages,
    theme: {},
  })

  plugins.push('docusaurus-plugin-sass')
  themes.push('@docusaurus/theme-mermaid')

  if (options.theme?.name !== ThemeNames.DocusaurusDefault)
    themes.push(
      // changing the order of plugins passed to makeSearchPluginConfig function
      // may cause the search plugin to skip indexing some pages.
      ...makeSearchPluginConfig(
        [...plugins, ...context.siteConfig.plugins],
        options,
      ),
    )

  if (options.theme?.name === ThemeNames.Default) {
    themes.push([
      '@acid-info/logos-docusaurus-theme',
      options.theme?.options ?? {},
    ])

    if (options.og) {
      const imageRenderer = require('@acid-info/logos-docusaurus-theme/lib/client/components/OGImageRenderer/index.js')

      context.siteConfig.plugins = [
        ...(context.siteConfig.plugins ?? []),

        [
          '@acid-info/docusaurus-og',
          /** @type {import('@acid-info/docusaurus-og').PluginOptions} */
          {
            path: options.og.path || '_og',
            imageRenderers: {
              'docusaurus-plugin-content-docs': imageRenderer.default.docs,
              'docusaurus-plugin-content-blog': imageRenderer.default.blog,
              'docusaurus-plugin-content-pages': imageRenderer.default.pages,
            },
          },
        ],
      ]
    }
  }

  if (options.generated) plugins.push([generatedDataPlugin, options.generated])

  return {
    plugins,
    themes,
  }
}

export * from './types'
export { validateOptions } from './validateOptions'
