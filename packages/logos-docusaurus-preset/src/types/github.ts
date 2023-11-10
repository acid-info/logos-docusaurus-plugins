type GithubProject = {
  name: string
}

type GithubUser = {
  login: string
  avatarUrl: string
}

type GithubComment = {
  id: string
  author: GithubUser
  body: string
  createdAt: string
}

type GithubAssignee = {
  login: string
  avatarUrl: string
}

export type GithubIssue = {
  id: string
  title: string
  body?: string
  url: string
  user: GithubUser
  labels: string[]
  commentCount: number
  comments: GithubComment[]
  assignees: GithubAssignee[]
  milestone?: string
  created_at: string
  updated_at: string
  projects: GithubProject[]
}

export type GithubIssuesPerRepo = {
  [key: string]: GithubIssue[]
}

export type RepoOwnerArray = {
  repo: string
  owner: string
}[]
