import type { PluginOptions } from '@docusaurus/theme-classic'
import type { LoadContext, Plugin } from '@docusaurus/types'
import path from 'path'

export default function logosTheme(
  context: LoadContext,
  options: PluginOptions,
): Plugin<undefined> {
  const clientModules: string[] = [
    path.resolve(__dirname, './client/css/custom.css'),
  ]

  if (options.customCss) {
    if (typeof options.customCss === 'string')
      clientModules.push(options.customCss)
    else clientModules.push(...options.customCss)
  }

  return {
    name: 'logos-docusaurus-theme',

    getThemePath: () => path.resolve(__dirname, './client/theme'),

    getTypeScriptThemePath: () =>
      path.resolve(__dirname, '../src/client/theme'),

    getClientModules: () => clientModules,
  }
}

export { PluginOptions }
