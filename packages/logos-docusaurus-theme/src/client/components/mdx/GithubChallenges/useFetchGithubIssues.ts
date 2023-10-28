import { useEffect, useState } from 'react'
import { dummyGithubIssue } from './githubChallengesDummyData'

type GithubIssueParticipant = {
  login: string
  avatarUrl: string
}

type GithubProject = {
  name: string
}

type GithubMilestone = string

type GithubIssueComment = {
  body: string
}

type GithubIssueLabel = {
  name: string
}

export type GithubIssue = {
  id: string
  title: string
  body: string
  url: string
  labels: GithubIssueLabel[]
  comments: GithubIssueComment[]
  participants: GithubIssueParticipant[]
  project?: GithubProject
  milestone?: GithubMilestone
  achievement: string
}

function useFetchGithubIssues(
  org: string,
  useDummyData: boolean = false,
): [GithubIssue[] | null, string | null, boolean] {
  const [data, setData] = useState<GithubIssue[] | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (useDummyData) {
      // Mocking an API call with setTimeout
      setTimeout(() => {
        try {
          // Success scenario:
          setData([dummyGithubIssue, dummyGithubIssue, dummyGithubIssue])
          setLoading(false)

          // Uncomment the below lines to simulate an error scenario:
          // throw new Error("Failed to fetch data");
        } catch (error) {
          let errorMessage = 'An error occurred'
          if (error instanceof Error) {
            errorMessage = error.message
          } else if (typeof error === 'string') {
            errorMessage = error
          }

          console.error(errorMessage)
          setErrorMessage(errorMessage)
          setLoading(false)
        }
      }, 2000) // Mock delay of 2 seconds
    }
  }, [])

  return [data, errorMessage, loading]
}

export default useFetchGithubIssues
