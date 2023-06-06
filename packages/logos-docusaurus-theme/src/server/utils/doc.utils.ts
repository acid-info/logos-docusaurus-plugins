import { LoadedVersion } from '@docusaurus/plugin-content-docs'
import { LoadContext } from '@docusaurus/types'
import { docuHash } from '@docusaurus/utils'
import path from 'path'

export const getVersionMetadataPath = (
  context: LoadContext,
  pluginId: string,
  loadedVersion: LoadedVersion,
) => {
  const pluginDataDirRoot = path.join(
    context.generatedFilesDir,
    'docusaurus-plugin-content-docs',
  )
  const dataDir = path.join(pluginDataDirRoot, pluginId)

  return path.join(
    dataDir,
    `${docuHash(`version-${loadedVersion.versionName}-metadata-prop`)}.json`,
  )
}
