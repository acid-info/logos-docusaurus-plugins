import { Typography } from '@acid-info/lsd-react'
import { SingleJobBoardList } from './SingleJobBoardList'
import useFetchJobs, { JobBoard, JobsPerBoard } from './useFetchJobs'
import React from 'react'
import { jobListsDummyData } from './jobListsDummyData'

const hasJobs = (jobsPerBoard: JobsPerBoard): boolean => {
  if (!jobsPerBoard) return false
  let jobFound = false

  Object.keys(jobsPerBoard).forEach((board) => {
    if (jobsPerBoard[board]!.jobs.length > 0) {
      jobFound = true
      return
    }
  })

  return jobFound
}

type JobListsProps = React.HTMLAttributes<HTMLDivElement> & {
  jobBoard: JobBoard
  titleFilter?: string
  fetchAll?: boolean
  useDummyData?: boolean
}

export const JobLists: React.FC<JobListsProps> = ({
  jobBoard,
  titleFilter = '',
  fetchAll = false,
  useDummyData = false,
  ...props
}) => {
  const { data, error, isLoading } = useFetchJobs(
    [jobBoard],
    fetchAll,
    titleFilter,
    useDummyData ? jobListsDummyData : null,
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

  const returnedJobBoards = Object.keys(data)

  return (
    <div {...props}>
      <Typography variant="h1" className="mdx-jl__header">
        Current job openings
      </Typography>
      {returnedJobBoards.map((board) => {
        const jobDataForBoard = data[board]
        return (
          <SingleJobBoardList
            key={board}
            jobBoard={board}
            jobs={jobDataForBoard ? jobDataForBoard.jobs : []}
          />
        )
      })}
    </div>
  )
}
