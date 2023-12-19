import {
  LoadedContent,
  PluginOptions as PagesPluginOptions,
} from '@docusaurus/plugin-content-pages'
import { LoadedPlugin, Props } from '@docusaurus/types'
import * as path from 'path'
import { PageData } from '../index'
import { Document } from './document'
import { ImageGenerator } from './imageGenerator'
import { ImageRenderer } from './types/image.types'
import { PluginOptions } from './types/plugin.types'

export class PagesPlugin {
  static plugin = 'docusaurus-plugin-content-pages'

  pages: Omit<PageData, 'document'>[] = []

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
    const plugins = this.context.plugins.filter(
      (plugin) => plugin.name === PagesPlugin.plugin,
    )

    for (const plugin of plugins) {
      await this.loadInstance(plugin)
    }
  }

  loadInstance = async (plugin: LoadedPlugin) => {
    const content = plugin.content as LoadedContent
    const options = plugin.options as PagesPluginOptions

    if (!Array.isArray(content)) return

    for (const metadata of content) {
      const doc = new Document(this.getHtmlPath(metadata.permalink))
      await doc.load()

      const title =
        (doc.loaded && doc.root.querySelector('title')?.textContent) || ''

      const description =
        (doc.loaded &&
          doc.root.querySelector('meta[name=description]')?.textContent) ||
        ''

      this.pages.push({
        metadata: {
          ...metadata,
          title,
          description,
        },
        plugin: options,
      })
    }
  }

  generate = async () => {
    for (const page of this.pages) {
      const document = new Document(this.getHtmlPath(page.metadata.permalink))
      await document.load()
      if (!document.loaded) continue

      const image = await this.imageRenderer(
        {
          ...page,
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

  getHtmlPath = (permalink: string) =>
    path.join(this.context.outDir, permalink, 'index.html')
}
