import type { LoadContext, Plugin } from '@docusaurus/types'
import { PluginOptions } from './client/types/plugin.types'
import path from 'path'
import fs from 'fs-extra'

export default function fathomPlugin(
  context: LoadContext,
  options: PluginOptions,
): Plugin<undefined> {
  const { siteId, scriptUrl, disabled = false } = options

  const dir = path.join(context.generatedFilesDir, 'docusaurus-fathom/default')
  fs.ensureDirSync(dir)

  fs.writeFileSync(
    path.join(dir, 'options.ts'),
    `export const SITE_ID = "${siteId}"\nexport const SCRIPT_URL = "${scriptUrl}"`,
  )

  return {
    name: 'docusaurus-fathom',
    getClientModules: () =>
      disabled ? [] : [path.resolve(__dirname, './client/index.js')],
  }
}

export { type PluginOptions }
