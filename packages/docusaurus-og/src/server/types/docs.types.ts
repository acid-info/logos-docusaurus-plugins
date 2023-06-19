import {
  DocMetadata,
  LoadedVersion,
  PluginOptions,
} from '@docusaurus/plugin-content-docs'

export type DocsPageData = {
  plugin: PluginOptions
  version: LoadedVersion
  metadata: DocMetadata
}
