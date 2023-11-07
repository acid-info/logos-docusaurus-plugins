import { PluginModule } from '@docusaurus/types'
import * as fsp from 'fs/promises'
import * as fs from 'fs'
import path from 'path'

type JobListConfig = {
  url: string
}

type ChallengeConfig = {
  repo: string
  owner: string
  githubAccessToken: string
}

export type GeneratedDataPluginConfig = {
  jobList?: JobListConfig
  challenges?: ChallengeConfig
}

const fetchJobList = async ({ url, out }: { out: string } & JobListConfig) => {
  const list = []

  await fsp.writeFile(out, JSON.stringify(list))
}

const fetchChallenges = async ({
  owner,
  repo,
  out,
  githubAccessToken,
}: {
  out: string
} & ChallengeConfig) => {
  const list = []

  await fsp.writeFile(out, JSON.stringify(list))
}

export const generatedDataPlugin: PluginModule = (context, options) => {
  const { challenges, jobList } = options as GeneratedDataPluginConfig

  const outDir = path.join(context.siteDir, './static/generated')

  if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true })

  fs.mkdirSync(outDir, { recursive: true })

  return {
    name: 'logos-data-plugin',
    loadContent: async () => {
      if (jobList)
        await fetchJobList({
          url: jobList.url,
          out: path.join(outDir, 'jobs.json'),
        })

      if (challenges)
        await fetchChallenges({
          repo: challenges.repo,
          owner: challenges.owner,
          githubAccessToken: challenges.githubAccessToken,
          out: path.join(outDir, 'challenges.json'),
        })
    },
  }
}
