import {
  LoadedContent,
  LoadedVersion,
  PluginOptions as DocsPluginOptions,
} from '@docusaurus/plugin-content-docs'
import { LoadedPlugin, Props } from '@docusaurus/types'
import * as path from 'path'
import { Document } from './document'
import { ImageGenerator } from './imageGenerator'
import { DocsPageData } from './types/docs.types'
import { ImageRenderer } from './types/image.types'
import { PluginOptions } from './types/plugin.types'

export class DocsPlugin {
  static plugin = 'docusaurus-plugin-content-docs'

  docs: DocsPageData[] = []

  constructor(
    private context: Props,
    private options: PluginOptions,
    private imageGenerator: ImageGenerator,
    private imageRenderer: ImageRenderer,
  ) {}

  process = async () => {
    await this.loadData()
    await this.generate()
  }

  loadData = async () => {
    const { plugins = [] } = this.context

    const docPlugins = plugins.filter(
      (plugin) => plugin.name === DocsPlugin.plugin,
    )

    for (const plugin of docPlugins) {
      await this.loadInstance(plugin)
    }
  }

  loadInstance = async (plugin: LoadedPlugin) => {
    const content = plugin.content as LoadedContent
    const options = plugin.options as DocsPluginOptions

    const { loadedVersions } = content

    for (const version of loadedVersions) {
      await this.loadVersion(options, version)
    }
  }

  loadVersion = async (options: DocsPluginOptions, version: LoadedVersion) => {
    this.docs.push(
      ...version.docs.map((doc) => ({
        version,
        metadata: doc,
        plugin: options,
      })),
    )
  }

  generate = async () => {
    for (const doc of this.docs) {
      const image = await this.imageRenderer(
        {
          ...doc,
          websiteOutDir: this.context.outDir,
        },
        this.context,
      )

      if (!image) continue

      const generated = await this.imageGenerator.generate(...image)
      const document = new Document(this.getHtmlPath(doc))
      await document.load()
      await document.setImage(generated.url)

      await document.write()
    }
  }

  getHtmlPath = (doc: DocsPageData) =>
    path.join(this.context.outDir, doc.metadata.permalink, 'index.html')
}
