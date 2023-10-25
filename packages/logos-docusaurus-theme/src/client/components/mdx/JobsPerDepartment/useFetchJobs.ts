import { useEffect, useRef, useState } from 'react'

/*
// Array of possible job boards:
const allJobBoards = [
  'testacidinfo', // Acid Test job board
  'logos',
  'nimbus',
  'codex',
  'status72', // Note: this job board has all the jobs from the other job boards
  'nomos',
  'thestatusnetwork',
  'instituteoffreetechnologies', // aka IFT
  'vac',
  'waku',
] as const
*/

export type JobDepartmentName = string

export type JobDepartmentData = {
  id: number
  name: string
  parent_id: number | null
  child_ids: number[]
  jobs: Job[]
}

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

export type JobDepartmentArray = JobDepartmentData[] | null

type UseFetchJobsReturn = {
  data: JobDepartmentArray
  error: Error | null
  isLoading: boolean
}

const parseJobDepartments = (
  rawJobDepartmentData: any,
  titleFilter?: string,
): JobDepartmentArray => {
  const jobDepartmentArray = rawJobDepartmentData?.departments

  if (!jobDepartmentArray) {
    throw Error('No departments found in rawJobDepartmentData')
  }

  if (!Array.isArray(jobDepartmentArray)) {
    throw Error('The received jobDepartmentArray is not an array')
  }

  // Map through each department and filter its jobs based on titleFilter
  const processedJobDepartmentArray: JobDepartmentData[] =
    jobDepartmentArray.map((department: JobDepartmentData) => {
      let filteredJobs = department.jobs

      if (titleFilter) {
        filteredJobs = department.jobs.filter((job) =>
          job.title.includes(titleFilter),
        )
      }

      return {
        ...department,
        jobs: filteredJobs,
      }
    })

  return processedJobDepartmentArray
}

// Fetches jobs from greenhouse via their department endpoint:
// https://developers.greenhouse.io/job-board.html#list-departments

export const useFetchJobs = (
  jobBoardToFetch: string,
  titleFilter: string = '',
  dummyResponse: JobDepartmentArray = null,
): UseFetchJobsReturn => {
  const [data, setData] = useState<JobDepartmentArray>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const isMounted = useRef(true)

  const fetchJobs = async (): Promise<{
    jobsPerDepartment: JobDepartmentArray
    errorData: Error | null
  }> => {
    try {
      if (dummyResponse) {
        console.log('dummy data bruh:', dummyResponse)
        return { jobsPerDepartment: dummyResponse, errorData: null }
      }

      const response = await fetch(
        `https://boards-api.greenhouse.io/v1/boards/${jobBoardToFetch}/departments`,
      )
      const jobDepartmentData = await response.json()

      const jobsPerDepartment: JobDepartmentArray = parseJobDepartments(
        jobDepartmentData,
        titleFilter,
      )

      return {
        jobsPerDepartment,
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
      return { jobsPerDepartment: null, errorData }
    }
  }

  useEffect(() => {
    if (isLoading) return

    setIsLoading(true)
    fetchJobs().then(({ jobsPerDepartment, errorData }) => {
      // We should not update state if the component is unmounted.
      if (!isMounted.current) return

      if (jobsPerDepartment) setData(jobsPerDepartment)
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
