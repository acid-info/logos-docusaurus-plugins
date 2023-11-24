import logger from '@docusaurus/logger'
import type { LoadContext, Plugin } from '@docusaurus/types'
import axios from 'axios'
import * as fg from 'fast-glob'
import * as fs from 'fs'
import * as fsp from 'fs/promises'
import * as path from 'path'
import * as tmp from 'tmp'
import unzipper from 'unzipper'

const copyFile = async (src: string, dest: string) => {
  const dirname = path.dirname(dest)
  if (!fs.existsSync(dirname)) {
    await fsp.mkdir(dirname, { recursive: true })
  }

  await fsp.copyFile(src, dest)
}

const copyContent = async (
  src: string,
  dest: string,
  options?: {
    keep?: string[]
    exclude?: string[]
  },
) => {
  const { keep = [], exclude = [] } = options || {}

  const tmpDir = tmp.dirSync({ unsafeCleanup: true })

  if (!fs.existsSync(dest)) await fsp.mkdir(dest, { recursive: true })

  {
    const filenames = fg.sync(['**/*'], {
      cwd: src,
      ignore: exclude,
      absolute: false,
    })

    for (const filename of filenames) {
      const absPath = path.join(src, filename)
      const stat = await fsp.stat(absPath)

      if (stat.isDirectory()) {
        await fsp.mkdir(path.join(tmpDir.name, filename), {
          recursive: true,
        })
      } else await copyFile(absPath, path.join(tmpDir.name, filename))
    }
  }

  {
    const filenames = fg.sync(keep, {
      cwd: dest,
    })

    for (const filename of filenames) {
      const absPath = path.join(dest, filename)
      const stat = await fsp.stat(absPath)

      if (stat.isDirectory()) {
        await fsp.mkdir(path.join(tmpDir.name, filename), {
          recursive: true,
        })
      } else await copyFile(absPath, path.join(tmpDir.name, filename))
    }
  }

  await fsp.rm(dest, { recursive: true, force: true })
  await fsp.cp(tmpDir.name, dest, { recursive: true })

  tmpDir.removeCallback()
}

type PluginOptions = {
  remote: {
    type: 'zip'
    url: string
    dir?: string
  }

  // The directory in the remote repository containing the content to be copied
  sourceDir: string

  // The directory in the local site to copy the content to
  outDir: string

  // Exclude files matching these glob patterns
  excludeRemote?: string[]

  // Keep local files matching these glob patterns
  keepLocal?: string[]

  // Keep local static files matching these glob patterns
  keepStatic?: string[]
}

export default async function remoteContentPlugin(
  context: LoadContext,
  options: PluginOptions,
): Promise<Plugin<undefined>> {
  const tempDir = tmp.dirSync({ unsafeCleanup: true })
  const repoDir = path.join(tempDir.name, 'repo')
  const zipDir = path.join(tempDir.name, 'zip')

  const downloadRemoteContent = async () => {
    const { remote, sourceDir, outDir } = options

    if (remote.type === 'zip') {
      const zip = await axios
        .get(remote.url, { responseType: 'stream' })
        .then((res) => res.data)
      const dest = unzipper.Extract({ path: zipDir })

      await new Promise((resolve, reject) => {
        zip.pipe(dest)

        dest.on('close', resolve)
        dest.on('error', reject)
      })

      if (remote.dir) {
        await fsp.rename(path.join(zipDir, remote.dir), repoDir)
      } else await fsp.rename(zipDir, repoDir)
    }
  }

  const copyRemoteContent = async () => {
    const {
      remote,
      sourceDir,
      outDir,
      excludeRemote = [],
      keepLocal = [],
    } = options

    await copyContent(
      path.join(repoDir, sourceDir),
      path.join(context.siteDir, outDir),
      {
        exclude: excludeRemote,
        keep: keepLocal,
      },
    )

    await copyContent(
      path.join(repoDir, 'static'),
      path.join(context.siteDir, 'static'),
      {
        exclude: [],
        keep: options.keepStatic ?? [],
      },
    )
  }

  try {
    logger.info`Downloading remote content from ${options.remote.url}`
    await downloadRemoteContent()
    await copyRemoteContent()
    tempDir.removeCallback()
  } catch (error) {
    tempDir.removeCallback()
    console.error(error)
    logger.error`Failed to download remote content from ${options.remote.url}`

    process.exit(1)
  }

  return {
    name: 'docusaurus-remote-content',
  }
}

export { type PluginOptions }
