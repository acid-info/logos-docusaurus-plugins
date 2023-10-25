import { useEffect, useRef, useState } from 'react'

/*
const allJobBoards = [
  'testacidinfo', // Acid Test job board
  'logos',
  'nimbus',
  'codex',
  'nomos',
  'thestatusnetwork',
  'instituteoffreetechnologies', // aka IFT
  'vac',
  'waku',
] as const

*/

const allJobBoards = ['codex', 'nomos', 'vac', 'waku'] as const

export type JobBoard = string

export type Job = {
  absolute_url: string
  data_compliance?: {
    type: string
    requires_consent: boolean
    requires_processing_consent: boolean
    requires_retention_consent: boolean
    retention_period: null | string
  }[]
  internal_job_id: number
  location: {
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

export type JobsPerBoard = Record<JobBoard, JobData> | null

type UseFetchJobsReturn = {
  data: JobsPerBoard
  error: Error | null
  isLoading: boolean
}

const parseJobs = (rawJobs: Job[], titleFilter?: string): JobData => {
  const jobs = titleFilter
    ? rawJobs.filter((job) => job.title?.includes(titleFilter))
    : rawJobs

  return { jobs, meta: { total: jobs.length } }
}

export const useFetchJobs = (
  jobBoardsToFetch: JobBoard[] = [],
  fetchAllJobBoards: boolean = false,
  titleFilter: string = '',
  dummyResponse: JobsPerBoard = null,
): UseFetchJobsReturn => {
  const [data, setData] = useState<JobsPerBoard>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const isMounted = useRef(true)

  const fetchJobs = async (): Promise<{
    jobsPerBoard: JobsPerBoard
    errorData: Error | null
  }> => {
    try {
      if (dummyResponse) {
        return { jobsPerBoard: dummyResponse, errorData: null }
      }

      const jobsPerBoard: JobsPerBoard = {}

      if (fetchAllJobBoards) {
        const promises = allJobBoards.map((boardName) =>
          fetch(
            `https://boards-api.greenhouse.io/v1/boards/${boardName}/jobs`,
          ).then((response) => response.json()),
        )

        const allResults = await Promise.all(promises)
        allResults.forEach((result, index) => {
          const currentBoard = allJobBoards[index]

          if (!currentBoard) {
            throw new Error('No current board found for ' + result)
          }

          jobsPerBoard[currentBoard] = parseJobs(result.jobs, titleFilter)
        })
      } else {
        for (let board of jobBoardsToFetch) {
          const response = await fetch(
            `https://boards-api.greenhouse.io/v1/boards/${board}/jobs`,
          )
          const jobData = await response.json()
          jobsPerBoard[board] = parseJobs(jobData.jobs, titleFilter)
        }
      }

      return {
        jobsPerBoard,
        errorData: null,
      }
    } catch (err) {
      const errorData =
        err instanceof Error
          ? err
          : typeof err === 'string'
          ? new Error(err)
          : new Error('Unknown error')

      console.error(err)
      return { jobsPerBoard: null, errorData }
    }
  }

  useEffect(() => {
    if (isLoading) return

    setIsLoading(true)
    fetchJobs().then(({ jobsPerBoard, errorData }) => {
      // We should not update state if the component is unmounted.
      if (!isMounted.current) return

      if (jobsPerBoard) setData(jobsPerBoard)
      if (errorData) setError(errorData)
      setIsLoading(false)
    })

    return () => {
      isMounted.current = false
    }
  }, [])

  return { data, error, isLoading }
}

export default useFetchJobs
