import { useActivePlugin } from '@docusaurus/plugin-content-docs/lib/client/index.js'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { DocConfig, ThemeOptions } from '../types/theme.types'

export const useThemeOptions = (): ThemeOptions => {
  const {
    siteConfig: { customFields = {} },
  } = useDocusaurusContext()

  return (customFields['logos-docusaurus-theme'] ?? {}) as ThemeOptions
}

export const useDocThemeOptions = (): DocConfig => {
  const activePlugin = useActivePlugin()
  const themeOptions = useThemeOptions()
  return activePlugin ? themeOptions?.docs?.[activePlugin?.pluginId] ?? {} : {}
}
