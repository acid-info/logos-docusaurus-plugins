import { PluginOptions as SearchPluginOptions } from '@acid-info/logos-docusaurus-search-local'
import classicPreset from '@docusaurus/preset-classic'
import type { LoadContext, PluginConfig, Preset } from '@docusaurus/types'
import * as path from 'path'
import { siteConfigs } from './site-config/index'
import { themeConfigs } from './theme-config/index'
import { PluginOptions, ThemeNames } from './types'
import { createCommonDataDir, createTeamFile } from './utils/data.utils'
import { findDocInstances, validateDocPluginOptions } from './utils/docs.utils'
import { defaultsDeep } from './utils/object.utils'

const makeSearchPluginConfig = (
  plugins: PluginConfig[],
  options: PluginOptions,
): PluginConfig[] => {
  const singleIndex = options.localSearch?.singleIndex ?? true

  const docs = findDocInstances(plugins).map((plugin) =>
    validateDocPluginOptions(plugin![1]),
  )

  const config = {
    hashed: true,
    indexDocs: true,
    indexBlog: false,
    indexPages: true,
    docsDir: docs.map((doc) => doc.path),
    docsRouteBasePath: docs.map((doc) => doc.routeBasePath),
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

  createCommonDataDir()
  createTeamFile(context, options)

  const { plugins = [], themes = [] } = classicPreset(context, {
    docs: docsEnabled
      ? {
          routeBasePath: '/',
          ...(options.docs ?? {}),
        }
      : false,
    theme: {},
  })

  plugins.push('docusaurus-plugin-sass')

  if (options.theme?.name !== ThemeNames.DocusaurusDefault)
    plugins.push(
      // changing the order of plugins passed to makeSearchPluginConfig function
      // may cause the search plugin to skip indexing some pages.
      ...makeSearchPluginConfig(
        [...plugins, ...context.siteConfig.plugins],
        options,
      ),
    )

  if (options.theme?.name === ThemeNames.Default)
    themes.push([
      '@acid-info/logos-docusaurus-theme',
      options.theme?.options ?? {},
    ])

  return {
    plugins,
    themes,
  }
}

export * from './types'
export { validateOptions } from './validateOptions'
