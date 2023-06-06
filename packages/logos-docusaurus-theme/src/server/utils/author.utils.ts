import { LoadedContent } from '@docusaurus/plugin-content-docs'
import {
  AllContent,
  LoadContext,
  PluginContentLoadedActions,
} from '@docusaurus/types'
import { docuHash } from '@docusaurus/utils'
import path from 'path'
import { ensureTrailingSlash } from '../../client/lib/string.utils'
import { getVersionMetadataPath } from './doc.utils'
import { getDocConfig } from './option.utils'

export const createAuthorRoutes = async (
  context: LoadContext,
  args: {
    allContent: AllContent
    actions: PluginContentLoadedActions
  },
) => {
  const docs = args.allContent['docusaurus-plugin-content-docs'] ?? {}

  const docContents = Object.entries(docs)

  for (const [id, loadedContent] of docContents) {
    const { loadedVersions } = loadedContent as LoadedContent

    for (const loadedVersion of loadedVersions) {
      const { path: versionPath } = loadedVersion

      const versionMetadataPath = getVersionMetadataPath(
        context,
        id,
        loadedVersion,
      )

      const conf = getDocConfig(context, id)
      const authorPageConf = conf?.content?.authorPage
      if (!authorPageConf) return

      const authors = conf?.content?.authors ?? []

      const authorDocs: Record<string, any[]> = {}

      loadedVersion.docs.forEach((doc) => {
        const { author } = doc.frontMatter as any
        const docAuthors = !author
          ? []
          : Array.isArray(author)
          ? author
          : [author]
        const validAuthors = docAuthors.map((authorKey) =>
          authors.find((a) => a.key === authorKey),
        )
        validAuthors.forEach((author) => {
          if (!author) return

          authorDocs[author.key] = [
            ...(authorDocs[author.key] ?? []),
            {
              id: doc.id,
              title: doc.title,
              description: doc.description,
              frontMatter: doc.frontMatter,
              permalink: doc.permalink,
            },
          ]
        })
      })

      const routes = await Promise.all(
        authors.map(async (author) => {
          const dataPath = await args.actions.createData(
            `${docuHash(
              `author-${author.key}-${loadedVersion.versionName}`,
            )}.json`,
            JSON.stringify({ author, docs: authorDocs[author.key] ?? [] }),
          )

          return {
            path: `${ensureTrailingSlash(versionPath)}author/${author.key}`,
            component: path.resolve(
              __dirname,
              '../../client/theme/AuthorPage/AuthorPage',
            ),
            exact: true,
            sidebar:
              typeof authorPageConf === 'boolean'
                ? null
                : authorPageConf!.sidebar,
            modules: {
              data: dataPath,
            },
          }
        }),
      )

      args.actions.addRoute({
        path: `${ensureTrailingSlash(versionPath)}author`,
        exact: false,
        component: '@theme/DocPage',
        routes: routes ?? [],
        modules: {
          versionMetadata: versionMetadataPath,
        },
        priority: 1000,
      })
    }
  }
}
