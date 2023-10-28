import { Button, Typography } from '@acid-info/lsd-react'
import React from 'react'
import { IconExternalLink } from '@logos-theme/components/Icon'
import './GithubChallenges.scss'
import Link from '@docusaurus/Link'
import { GithubIssue } from './useFetchGithubIssues'

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
            {label.name}
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
            {issue.comments.length}
          </Typography>
          {issue.participants.map((participant, index) => (
            <img
              key={index}
              className="mdx-ghc__participant-photo"
              src={addSizeToAvatarUrl(participant.avatarUrl)}
              alt={participant.login}
            />
          ))}
        </div>

        {/* 1st row 3rd item */}
        <Typography variant="body3" className="mdx-ghc__label">
          Project
        </Typography>

        {/* 1st row 4th item */}
        <Typography variant="body3" className="mdx-ghc__project-name">
          {issue.project ? issue.project.name : ''}
        </Typography>

        {/* 2nd row 1st item */}
        <Typography variant="body3" className="mdx-ghc__label">
          Achievement
        </Typography>

        {/* 2nd row 2nd item */}
        <div className="mdx-ghc__achievement">
          <img
            className="mdx-ghc__participant-photo"
            src={addSizeToAvatarUrl(
              'https://avatars.githubusercontent.com/u/8811422?u=b4aec0f11a78abe3b71c42e4adfba3ebd61f34aa&v=4',
            )}
          />
        </div>

        {/* 2nd row 3rd item */}
        <Typography variant="body3" className="mdx-ghc__label">
          Milestone
        </Typography>

        {/* 2nd row 4th item */}
        <Typography variant="body3" className="mdx-ghc__milestone-text">
          {issue.milestone || ''}
        </Typography>
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
