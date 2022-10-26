import { PluginOptions as DocPluginOptions } from '@docusaurus/plugin-content-docs'
import { PluginConfig } from '@docusaurus/types'
import { normalizePluginOptions } from '@docusaurus/utils-validation'
import { findPluginByName } from './plugin.utils'

export const findDocInstances = (plugins: PluginConfig[]): PluginConfig[] =>
  findPluginByName(plugins, '@docusaurus/plugin-content-docs')

export const validateDocPluginOptions = (
  options: DocPluginOptions,
): DocPluginOptions =>
  require('@docusaurus/plugin-content-docs').validateOptions({
    validate: normalizePluginOptions,
    options,
  })
