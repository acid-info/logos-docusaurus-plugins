import type { LoadContext, Plugin } from '@docusaurus/types'
import { PluginOptions } from '@easyops-cn/docusaurus-search-local'
import * as path from 'path'
// @ts-ignore
import searchPlugin from '@easyops-cn/docusaurus-search-local/dist/server/server/index'
// @ts-ignore
import { validateOptions } from '@easyops-cn/docusaurus-search-local/dist/server/server/index'

export default function searchPlugin(
  context: LoadContext,
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
