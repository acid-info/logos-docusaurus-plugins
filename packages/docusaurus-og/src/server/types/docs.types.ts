import {
  DocMetadata,
  LoadedVersion,
  PluginOptions,
} from '@docusaurus/plugin-content-docs'
import { Document } from '../document'

export type DocsPageData = {
  plugin: PluginOptions
  version: LoadedVersion
  metadata: DocMetadata
  document: Document
}
