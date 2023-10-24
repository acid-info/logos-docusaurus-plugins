import React, { useState } from 'react'
import useFetchJobs, { JobBoard, Job } from './useFetchJobs'

type Props = {
  jobBoard: JobBoard
  titleFilter?: string
}

export const JobList: React.FC<Props> = ({ jobBoard, titleFilter = '' }) => {
  const { data, error, fetchJobs } = useFetchJobs()
  const [isLoading, setIsLoading] = useState(false)

  const handleFetchJobs = async () => {
    setIsLoading(true)
    await fetchJobs([jobBoard], titleFilter)
    setIsLoading(false)
  }

  React.useEffect(() => {
    handleFetchJobs()
  }, [jobBoard, titleFilter])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>No data</div>
  }

  return (
    <div>
      <h2>Job List</h2>
      <ul>
        {data.jobs.map((job: Job, index: number) => (
          <li key={index}>
            <a
              href={job.absolute_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {job.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
