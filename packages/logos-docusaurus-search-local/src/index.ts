import type { LoadContext, Plugin } from '@docusaurus/types'

import * as path from 'path'
import {
  DocusaurusContext,
  PluginOptions,
} from '@easyops-cn/docusaurus-search-local/dist/server/shared/interfaces'
import searchPlugin from '@easyops-cn/docusaurus-search-local/dist/server/server/index'

import { validateOptions } from '@easyops-cn/docusaurus-search-local/dist/server/server/index'

export default function LocalsearchPlugin(
  context: DocusaurusContext,
  options: PluginOptions,
): Plugin<undefined> {
  const plugin = searchPlugin(context, options) as any

  delete plugin.getThemePath
  delete plugin.getPathsToWatch
  delete plugin.contentLoaded

  return {
    ...plugin,
    name: 'logos-docusaurus-search-local',
    getClientModules: () => [
      ...(typeof plugin.getClientModules !== 'undefined'
        ? plugin.getClientModules()
        : []),
      path.resolve(__dirname, './client/index.js'),
    ],
  }
}

export { validateOptions, type PluginOptions }
