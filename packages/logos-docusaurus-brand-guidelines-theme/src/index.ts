import type { LoadContext, Plugin } from '@docusaurus/types'
import path from 'path'
import type { ThemeOptions } from './client/types/theme.types'
import { buildLSDStorybookDocs } from './server/utils/build-lsd-storybook-docs'

export default async function logosTheme(
  context: LoadContext,
  options: ThemeOptions,
): Promise<Plugin<any>> {
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

  if (options.lsdDocs) {
    await buildLSDStorybookDocs({
      ...options.lsdDocs,
      staticDirectory: path.join(
        context.siteDir,
        'static',
        options.lsdDocs.staticDirectory,
      ),
      componentsDirectory: path.join(
        context.siteDir,
        options.lsdDocs.componentsDirectory,
      ),
      designTokensDirectory: path.join(
        context.siteDir,
        options.lsdDocs.designTokensDirectory,
      ),
    })
  }

  return {
    name: 'logos-docusaurus-brand-guidelines-theme',

    getThemePath: () => path.resolve(__dirname, './client/theme'),

    getTypeScriptThemePath: () =>
      path.resolve(__dirname, '../src/client/theme'),

    getClientModules: () => clientModules,

    loadContent: async () => {},
  }
}

export { validateOptions } from './server/utils/validateOptions'
export type { ThemeOptions }
