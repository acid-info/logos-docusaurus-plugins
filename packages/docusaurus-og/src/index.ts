import type { LoadContext, Plugin } from '@docusaurus/types'
import { postBuildFactory } from './server/index'
import { PluginOptions } from './server/types/plugin.types'
export { imageRendererFactory } from './server/imageRenderer.factory'
export * from './server/types'
export type { PluginOptions }

export default function logosTheme(
  context: LoadContext,
  options: PluginOptions,
): Plugin<any> {
  console.log('canary release test')
  return {
    name: 'docusaurus-og',

    async postBuild(props) {
      await postBuildFactory(options)(props)
    },
  }
}
