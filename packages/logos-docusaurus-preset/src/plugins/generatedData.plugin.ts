import { PluginModule } from '@docusaurus/types'
import * as fsp from 'fs/promises'
import * as fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import { fetchGithubIssues } from '../utils/github.utils'

type JobListConfig = {
  jobBoard: string
}

type ChallengeConfig = {
  repoArray: {
    repo: string
    owner: string
  }[]
  githubAccessToken: string
}

export type GeneratedDataPluginConfig = {
  jobList?: JobListConfig
  challenges?: ChallengeConfig
}

export type FetchJobListParams = {
  jobBoard: string
  out: string
}

const fetchJobList = async ({ jobBoard, out }: FetchJobListParams) => {
  try {
    const response = await fetch(
      `https://boards-api.greenhouse.io/v1/boards/${jobBoard}/departments`,
    )
    const jobDepartmentData = await response.json()

    await fsp.writeFile(out, JSON.stringify(jobDepartmentData))
  } catch (err) {
    console.error('\nfetchJobList error:')
    console.error(err)
  }
}

const fetchChallenges = async ({
  repoArray,
  out,
  githubAccessToken,
}: {
  out: string
} & ChallengeConfig) => {
  const issues = await fetchGithubIssues(repoArray, githubAccessToken)

  await fsp.writeFile(out, JSON.stringify(issues))
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
          jobBoard: jobList.jobBoard,
          out: path.join(outDir, 'jobs.json'),
        })

      if (challenges)
        await fetchChallenges({
          repoArray: challenges.repoArray,
          githubAccessToken: challenges.githubAccessToken,
          out: path.join(outDir, 'challenges.json'),
        })
    },
  }
}
