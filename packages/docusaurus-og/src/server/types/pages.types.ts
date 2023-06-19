import { Metadata, PluginOptions } from '@docusaurus/plugin-content-pages'

export type PageData = {
  metadata: Omit<Metadata, 'title' | 'description'> & {
    title: string
    description?: string
  }
  plugin: PluginOptions
}
