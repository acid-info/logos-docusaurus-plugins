import { Typography } from '@acid-info/lsd-react'
import React from 'react'
import { dummyGithubIssue } from './githubChallengesDummyData'
import { SingleGithubChallenge } from './SingleGithubChallenge'
import { GithubIssue } from '@acid-info/logos-docusaurus-preset/src/types/github'

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
  return Array.isArray(githubChallenges) && !!githubChallenges.length
}

const getIssuesFromRawData = (rawData: any): GithubIssue[] => {
  let issues: GithubIssue[] = []

  Object.keys(rawData).forEach((key) => {
    if (!isNaN(Number(key))) {
      // Extract the array of issues for each repository
      const repoIssues = Object.values(rawData[key])[0] // each object should have only one key-value pair
      if (Array.isArray(repoIssues)) {
        issues = issues.concat(repoIssues)
      }
    }
  })

  return issues
}

type GithubChallengesProps = React.HTMLAttributes<HTMLDivElement> & {
  challengesData: any
  useDummyData?: boolean
  subheaderText?: string
  filterByName?: string // A string that represents a regex pattern
}

export const GithubChallenges: React.FC<GithubChallengesProps> = ({
  challengesData,
  useDummyData,
  subheaderText,
  filterByName,
  ...props
}) => {
  let challengesArray: GithubIssue[] | undefined | null = useDummyData
    ? [dummyGithubIssue]
    : getIssuesFromRawData(challengesData)

  if (!challengesArray || !hasChallenges(challengesArray)) {
    return <GithubChallengesHeader message="No challenges to show" />
  }

  if (filterByName) {
    try {
      const regex = new RegExp(filterByName, 'i') // 'i' for case-insensitive
      challengesArray = challengesArray?.filter((issue) =>
        regex.test(issue.title),
      )
    } catch (error) {
      console.error('Invalid regex pattern:', error)
    }
  }

  return (
    <div {...props}>
      <GithubChallengesHeader />
      {!!subheaderText && (
        <Typography
          variant="body1"
          className="mdx-ghc-subheader-text"
          component="div"
        >
          {subheaderText}
        </Typography>
      )}
      {challengesArray.map((issue) => (
        <SingleGithubChallenge key={issue.id} issue={issue} />
      ))}
    </div>
  )
}
