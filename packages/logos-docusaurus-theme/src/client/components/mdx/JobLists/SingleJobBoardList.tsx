import { Typography } from '@acid-info/lsd-react'
import { Job, JobBoard } from './useFetchJobs'
import React from 'react'
import { IconExternalLink } from '@logos-theme/components/Icon'
import './JobLists.scss'

type SingleJobBoardListProps = {
  jobBoard: JobBoard
  jobs: Job[]
}

export const SingleJobBoardList: React.FC<SingleJobBoardListProps> = ({
  jobBoard,
  jobs,
}) => {
  return (
    <div className="mdx-jl__single-job-board-container">
      <Typography variant="subtitle2" className="mdx-jl__board-title">
        {jobBoard}
      </Typography>
      <ul className="mdx-jl__job-list">
        {jobs.map((job, index) => (
          <li key={index} className="mdx-jl__job-list-item">
            <a
              href={job.absolute_url}
              target="_blank"
              className="mdx-jl__job-link"
            >
              <div className="mdx-jl__job-title-container">
                <Typography variant="h6" className="mdx-jl__job-title">
                  {job.title}
                </Typography>
                <IconExternalLink className="mdx-jl__external-link-icon" />
              </div>

              {!!job.location?.name && (
                <Typography variant="subtitle2" component="div">
                  {job.location.name}
                </Typography>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
