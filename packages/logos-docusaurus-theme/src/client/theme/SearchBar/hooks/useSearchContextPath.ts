import { useActivePluginAndVersion } from '@docusaurus/plugin-content-docs/client'
import { ensureTrailingSlash } from '../../../lib/string.utils'

const useProxiedData = () => {
  const win = window as any
  return win.getProxiedGeneratedData()
}

const useSearchContextByPaths = () => {
  return useProxiedData().searchContextByPaths
}

export const useSearchContextPath = () => {
  const separateContexts = useSearchContextByPaths()

  const activePluginData = useActivePluginAndVersion()
  if (!activePluginData) return ['/', '']

  const {
    activePlugin: {
      pluginData: { path: pluginPath },
    },
    activeVersion,
  } = activePluginData
  if (!activeVersion) return ['/', '']

  return [
    pluginPath !== activeVersion.path
      ? ensureTrailingSlash(activeVersion.path)
      : '/',
    separateContexts,
  ]
}
