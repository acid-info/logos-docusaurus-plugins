import { Typography } from '@acid-info/lsd-react'
import { SingleDepartmentJobs } from './SingleDepartmentJobs'
import useFetchJobs, { JobDepartmentArray } from './useFetchJobs'
import React from 'react'
import { jobsPerDepartmentDummyData } from './jobsPerDepartmentDummyData'

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
  jobBoard: string
  titleFilter?: string
  fetchAll?: boolean
  useDummyData?: boolean
}

export const JobsPerDepartment: React.FC<JobsPerDepartmentProps> = ({
  jobBoard,
  titleFilter = '',
  fetchAll = false,
  useDummyData = false,
  ...props
}) => {
  const { data, error, isLoading } = useFetchJobs(
    jobBoard,
    titleFilter,
    useDummyData ? jobsPerDepartmentDummyData : null,
  )

  if (isLoading) {
    // Skipping loading state for now, as per the designer's request.
    return <JobsPerDepartmentHeader />
  }

  if (error) {
    return <JobsPerDepartmentHeader message="Error fetching data" />
  }

  if (!data || !hasJobs(data)) {
    return <JobsPerDepartmentHeader message="No job openings to show" />
  }

  return (
    <div {...props}>
      <JobsPerDepartmentHeader />
      {data.map((department) => {
        return (
          <SingleDepartmentJobs key={department.name} department={department} />
        )
      })}
    </div>
  )
}
