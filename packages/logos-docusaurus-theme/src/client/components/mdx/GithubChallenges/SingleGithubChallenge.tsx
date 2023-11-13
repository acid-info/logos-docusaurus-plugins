import { Button, Typography } from '@acid-info/lsd-react'
import React from 'react'
import { IconExternalLink } from '@logos-theme/components/Icon'
import './GithubChallenges.scss'
import Link from '@docusaurus/Link'
import { GithubIssue } from '@acid-info/logos-docusaurus-preset/src/types/github'

const getProjectNames = (issue: GithubIssue): string => {
  const projectNames = issue.projects.map((project) => project.name)

  if (projectNames.length === 0) {
    return ''
  }

  return Array.from(new Set(projectNames)).join(', ')
}

type Participant = {
  name: string
  avatarUrl: string
}

const extractUniqueParticipants = (issue: GithubIssue): Participant[] => {
  const participants = new Map<string, Participant>()

  // Add the user who created the issue
  participants.set(issue.user.login, {
    name: issue.user.login,
    avatarUrl: issue.user.avatarUrl,
  })

  // Add all assignees
  issue.assignees.forEach((assignee) => {
    participants.set(assignee.login, {
      name: assignee.login,
      avatarUrl: assignee.avatarUrl,
    })
  })

  // Add all comment authors
  issue.comments.forEach((comment) => {
    participants.set(comment.author.login, {
      name: comment.author.login,
      avatarUrl: comment.author.avatarUrl,
    })
  })

  return Array.from(participants.values())
}

function addSizeToAvatarUrl(avatarUrl: string, size: number = 24): string {
  const url = new URL(avatarUrl)
  const params = new URLSearchParams(url.search)
  params.set('s', size.toString())

  // Prepend the size parameter to the start of the query string
  url.search = Array.from(params.entries())
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  return url.toString()
}

type SingleGithubChallengeProps = {
  issue: GithubIssue
}

export const SingleGithubChallenge: React.FC<SingleGithubChallengeProps> = ({
  issue,
}) => {
  const participants = extractUniqueParticipants(issue)
  const projectsConst = getProjectNames(issue)
  const hasProjects = projectsConst !== ''
  const hasMilestone = !!issue.milestone

  const elementsToRender: React.ReactNode[] = []

  if (hasProjects) {
    elementsToRender.push(
      <>
        <Typography variant="body3" className="mdx-ghc__label">
          {projectsConst.includes(', ') ? 'Projects' : 'Project'}
        </Typography>
        <Typography variant="body3" className="mdx-ghc__project-name">
          {projectsConst}
        </Typography>
      </>,
    )
  }

  if (hasMilestone) {
    elementsToRender.push(
      <>
        <Typography variant="body3" className="mdx-ghc__label">
          Milestone
        </Typography>
        <Typography variant="body3" className="mdx-ghc__milestone-text">
          {issue.milestone}
        </Typography>
      </>,
    )
  }

  return (
    <div className="mdx-ghc__container">
      <Link href={issue.url} className="mdx-ghc__issue-title-link">
        <Typography variant="h6" className="mdx-ghc__issue-title">
          {issue.title}
        </Typography>
      </Link>

      <div className="mdx-ghc__challenge-labels">
        {issue.labels.map((label, index) => (
          <Typography
            variant="body3"
            key={index}
            className="mdx-ghc__challenge-label"
          >
            {label}
          </Typography>
        ))}
      </div>

      <div className="mdx-ghc__issue-content-grid">
        {/* 1st row 1st item */}
        <Typography variant="body3" className="mdx-ghc__label">
          Participants
        </Typography>

        {/* 1st row 2nd item */}
        <div className="mdx-ghc__participant-photo-container">
          <Typography
            variant="body3"
            className="mdx-ghc__comment-count"
            component="div"
          >
            {participants.length}
          </Typography>
          {participants.map((participant, index) => (
            <img
              key={index}
              className="mdx-ghc__participant-photo"
              src={addSizeToAvatarUrl(participant.avatarUrl)}
              alt={participant.name}
            />
          ))}
        </div>

        {/* Render Projects and/or Milestone */}
        {elementsToRender.map((element, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        ))}
      </div>

      <Link href={issue.url} className="mdx-ghc__view-on-github-link">
        <Button
          className="mdx-ghc__view-on-github-button"
          icon={<IconExternalLink />}
        >
          View on GitHub
        </Button>
      </Link>
    </div>
  )
}
