import { Props } from '@docusaurus/types'
import { BlogPlugin } from './blog.plugin'
import { DocsPlugin } from './docs.plugin'
import { ImageGenerator } from './imageGenerator'
import { PagesPlugin } from './pages.plugin'
import { PluginOptions } from './types/plugin.types'

const plugins = {
  [DocsPlugin.plugin]: DocsPlugin,
  [BlogPlugin.plugin]: BlogPlugin,
  [PagesPlugin.plugin]: PagesPlugin,
}

export const postBuildFactory =
  (options: PluginOptions) => async (props: Props) => {
    const imageGenerator = new ImageGenerator({
      websiteUrl: props.siteConfig.url,
      websiteOutDir: props.outDir,
      dir: options.path,
    })

    await imageGenerator.init()

    const pluginNames = Object.keys(options.imageRenderers)

    for (const pluginName of pluginNames) {
      const renderer = options.imageRenderers[pluginName]
      const Plugin = plugins[pluginName]
      const plugin =
        Plugin && new Plugin(props, options, imageGenerator, renderer!)

      plugin && (await plugin.process())
    }
  }
