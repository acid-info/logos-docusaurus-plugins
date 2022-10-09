import { useActivePlugin } from '@docusaurus/plugin-content-docs/client'
import { useDocsPreferredVersion } from '@docusaurus/theme-common/internal'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { useProxiedGeneratedData } from './useProxiedGeneratedData'

export const useVersionUrl = () => {
  const {
    siteConfig: { baseUrl },
  } = useDocusaurusContext()

  const { docsPluginIdForPreferredVersion } = useProxiedGeneratedData()

  let result = baseUrl

  const activePlugin = useActivePlugin()

  const { preferredVersion } = useDocsPreferredVersion(
    activePlugin?.pluginId ?? docsPluginIdForPreferredVersion,
  )

  result =
    preferredVersion && !preferredVersion.isLast
      ? preferredVersion.path + '/'
      : result

  return result
}
