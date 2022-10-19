import { useLocation } from '@docusaurus/router'
import { useActiveVersionPath } from './useActiveVersionPath'

export const useIsVersionIndexPage = () => {
  const { pathname } = useLocation()
  const versionPath = useActiveVersionPath()

  return pathname === versionPath
}
