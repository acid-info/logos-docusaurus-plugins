import type { PluginOptions as DefaultPluginOptions } from '@docusaurus/theme-classic'
import { BuildLSDStorybookDocsOptions } from '../../server/utils/build-lsd-storybook-docs'

export type ThemeOptions = DefaultPluginOptions & {
  lsdDocs?: BuildLSDStorybookDocsOptions
}
