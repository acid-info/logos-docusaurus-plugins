import {
  PluginOptions as DocsPluginOptions,
  LoadedContent,
  LoadedVersion,
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

  docs: Omit<DocsPageData, 'document'>[] = []

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
      const document = new Document(this.getHtmlPath(doc)!)
      await document.load()

      const image = await this.imageRenderer(
        {
          ...doc,
          document,
          websiteOutDir: this.context.outDir,
        },
        this.context,
      )

      if (!image) {
        await document.write()
        continue
      }

      const generated = await this.imageGenerator.generate(...image)
      await document.setImage(generated.url)

      await document.write()
    }
  }

  getHtmlPath = (doc: Partial<DocsPageData>) =>
    doc.metadata?.slug &&
    path.join(this.context.outDir, doc.metadata.slug, 'index.html')
}
