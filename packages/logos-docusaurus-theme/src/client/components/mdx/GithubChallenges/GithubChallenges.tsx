import { Typography } from '@acid-info/lsd-react'
import { SingleGithubChallenge } from './SingleGithubChallenge'
import React from 'react'
import useFetchGithubIssues, { GithubIssue } from './useFetchGithubIssues'

type GithubChallengesHeaderProps = {
  message?: string
}

const GithubChallengesHeader: React.FC<GithubChallengesHeaderProps> = ({
  message,
}) => {
  return (
    <>
      <Typography variant="h1" className="mdx-ghc__header">
        Open challenges
      </Typography>

      {!!message && <Typography variant="body1">{message}</Typography>}
    </>
  )
}

const hasChallenges = (githubChallenges: GithubIssue[]): boolean => {
  return githubChallenges.length > 0
}

type GithubChallengesProps = React.HTMLAttributes<HTMLDivElement> & {
  org: string
  useDummyData?: boolean
}

export const GithubChallenges: React.FC<GithubChallengesProps> = ({
  org,
  useDummyData,
  ...props
}) => {
  const [data, error, loading] = useFetchGithubIssues(org, useDummyData)

  if (loading) {
    return <GithubChallengesHeader />
  }

  if (error) {
    return <GithubChallengesHeader message="Error fetching data" />
  }

  if (!data || !hasChallenges(data)) {
    return <GithubChallengesHeader message="No challenges to show" />
  }

  return (
    <div {...props}>
      <GithubChallengesHeader />
      <Typography
        variant="body1"
        className="mdx-ghc-subheader-text"
        component="div"
      >
        Lorem ipsum dolor sit amet consectetur. Enim magna urna fames mattis
        tincidunt nibh mi ornare. Sed amet morbi mauris pellentesque fusce ut.
        Bibendum vestibulum Lorem ipsum dolor sit amet consectetur. Enim magna
        urna fames mattis tincidunt nibh mi ornare. Sed amet morbi mauris
        pellentesque fusce ut. Bibendum vestibulum
      </Typography>
      {data.map((issue) => {
        return <SingleGithubChallenge key={issue.id} issue={issue} />
      })}
    </div>
  )
}
