import { useState } from 'react'

// Inspired by:
// https://github.com/acid-info/rnd-dynamic-list/blob/master/react/useFetchJobs.js

const jobBoards = [
  'acidtest',
  'logos',
  'status',
  'nimbus',
  'codex',
  'nomos',
  'statusnetwork',
  'ift',
  'vac',
  'waku',
] as const

export type JobBoard = (typeof jobBoards)[number]

const jobBoardMappings: Record<JobBoard, string> = {
  acidtest: 'testacidinfo',
  logos: 'logos',
  status: 'status72',
  nimbus: 'nimbus',
  codex: 'codex',
  nomos: 'nomos',
  statusnetwork: 'thestatusnetwork',
  ift: 'instituteoffreetechnologies',
  vac: 'vac',
  waku: 'waku',
}

export type Job = {
  absolute_url: string
  data_compliance?: {
    type: string
    requires_consent: boolean
    requires_processing_consent: boolean
    requires_retention_consent: boolean
    retention_period: null | string // Assuming retention_period can be a string or null.
  }[]
  internal_job_id: number
  location?: {
    name: string
  }
  metadata?: any
  id: number
  updated_at: string
  requisition_id: string
  title: string
}

type JobData = {
  jobs: Job[]
  meta: {
    total: number
  }
} | null

type UseFetchJobs = {
  data: JobData
  error: any
  fetchJobs: (jobBoardsToFetch: JobBoard[], titleFilter: string) => void
}

export const useFetchJobs = (): UseFetchJobs => {
  const [data, setData] = useState<JobData>(null)
  const [error, setError] = useState<Error | null>(null)

  const fetchJobs = async (jobBoardsToFetch: JobBoard[], titleFilter) => {
    try {
      const resultsPerBoard: Partial<Record<JobBoard, string>> = {}

      for (let board of jobBoardsToFetch) {
        const response = await fetch(
          `https://boards-api.greenhouse.io/v1/boards/${jobBoardMappings[board]}/jobs`,
        )
        const jobData = await response.json()
        resultsPerBoard[board] = jobData.jobs
      }

      let jobs = Object.values(resultsPerBoard).flat() as unknown as Job[]

      if (titleFilter) {
        jobs = jobs.filter(
          (job) => job.title && job.title.includes(titleFilter),
        )
      }

      setData({ jobs, meta: { total: jobs.length } })
    } catch (err) {
      if (err instanceof Error) {
        setError(err)
      } else if (typeof err === 'string') {
        setError(new Error(err))
      } else {
        setError(new Error('Unknown error'))
      }

      console.error(err)
    }
  }

  return { data, error, fetchJobs }
}

export default useFetchJobs
