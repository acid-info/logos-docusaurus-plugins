import { Typography } from '@acid-info/lsd-react'
import { SingleDepartmentJobs } from './SingleDepartmentJobs'
import React from 'react'
import { jobsPerDepartmentDummyData } from './jobsPerDepartmentDummyData'

export type JobDepartmentData = {
  id: number
  name: string
  parent_id: number | null
  child_ids: number[]
  jobs: Job[]
}

type Job = {
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

type JobsPerDepartmentHeaderProps = {
  message?: string
}

const JobsPerDepartmentHeader: React.FC<JobsPerDepartmentHeaderProps> = ({
  message,
}) => {
  return (
    <>
      <Typography variant="h1" className="mdx-jpd__header">
        Current job openings
      </Typography>

      {!!message && <Typography variant="body1">{message}</Typography>}
    </>
  )
}

const hasJobs = (jobsPerDepartment: JobDepartmentArray): boolean => {
  if (!jobsPerDepartment) return false

  // Check if there's any department that has at least one job
  let jobFound = jobsPerDepartment.some((department) => {
    return department.jobs && department.jobs.length > 0
  })

  return jobFound
}

type JobsPerDepartmentProps = React.HTMLAttributes<HTMLDivElement> & {
  jobData: { departments?: JobDepartmentArray }
  titleFilter?: string
  fetchAll?: boolean
  useDummyData?: boolean
}

export const JobsPerDepartment: React.FC<JobsPerDepartmentProps> = ({
  jobData,
  titleFilter = '',
  fetchAll = false,
  useDummyData = false,
  ...props
}) => {
  let jobArray: JobDepartmentData[] | undefined | null = useDummyData
    ? jobsPerDepartmentDummyData
    : jobData?.departments

  if (!jobArray || !hasJobs(jobArray)) {
    return <JobsPerDepartmentHeader message="No job openings to show" />
  }

  // Filter jobs in each department based on titleFilter
  if (jobArray && titleFilter) {
    jobArray = jobArray.map((department) => ({
      ...department,
      jobs: department.jobs.filter((job) => job.title.includes(titleFilter)),
    }))
  }

  return (
    <div {...props}>
      <JobsPerDepartmentHeader />
      {jobArray.map((department) => {
        return (
          <SingleDepartmentJobs key={department.name} department={department} />
        )
      })}
    </div>
  )
}
