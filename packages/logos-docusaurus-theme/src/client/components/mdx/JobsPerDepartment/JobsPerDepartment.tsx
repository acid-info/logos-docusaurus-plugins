import { Typography } from '@acid-info/lsd-react'
import { SingleDepartmentJobs } from './SingleDepartmentJobs'
import useFetchJobs, { JobDepartmentArray } from './useFetchJobs'
import React from 'react'
import { jobsPerDepartmentDummyData } from './jobsPerDepartmentDummyData'

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

  console.log('data', data)
  console.log('error', error)
  console.log('isLoading', isLoading)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching data</div>
  }

  if (!data || !hasJobs(data)) {
    return <div>No job openings to show</div>
  }

  return (
    <div {...props}>
      <Typography variant="h1" className="mdx-jpd__header">
        Current job openings
      </Typography>
      {data.map((department) => {
        return (
          <SingleDepartmentJobs key={department.name} department={department} />
        )
      })}
    </div>
  )
}
