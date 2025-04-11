import { Typography } from '@acid-info/lsd-react'
import React from 'react'
import Link from '@docusaurus/Link'
import { IconExternalLink } from '../../../components/Icon'
import './JobsPerDepartment.scss'
import { JobDepartmentData } from '.'

type SingleDepartmentJobsProps = {
  department: JobDepartmentData
}

export const SingleDepartmentJobs: React.FC<SingleDepartmentJobsProps> = ({
  department,
}) => {
  if (!department.jobs || department.jobs.length === 0) {
    return null
  }

  return (
    <div className="mdx-jpd__single-job-department-container">
      <Typography variant="subtitle2" className="mdx-jpd__department-title">
        {department.name}
      </Typography>
      <ul className="mdx-jpd__job-list">
        {department.jobs.map((job, index) => (
          <li key={index} className="mdx-jpd__job-list-item">
            <Link
              href={job.absolute_url}
              target="_blank"
              className="mdx-jpd__job-link"
            >
              <div className="mdx-jpd__job-title-container">
                <Typography variant="h5" className="mdx-jpd__job-title">
                  {job.title}
                </Typography>
                <IconExternalLink className="mdx-jpd__external-link-icon" />
              </div>

              {!!job.location?.name && (
                <Typography variant="subtitle2" component="div">
                  {job.location.name}
                </Typography>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
