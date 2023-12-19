import { Metadata, PluginOptions } from '@docusaurus/plugin-content-pages'
import { Document } from '../document'

export type PageData = {
  metadata: Omit<Metadata, 'title' | 'description'> & {
    title: string
    description?: string
  }
  plugin: PluginOptions
  document: Document
}
