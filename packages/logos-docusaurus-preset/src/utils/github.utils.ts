import {
  GithubIssue,
  GithubIssuesPerRepo,
  RepoOwnerArray,
} from '../types/github'
import fetch from 'node-fetch'

const https = require('https')

// Inspired by:
// https://github.com/acid-info/rnd-dynamic-list/blob/master/challenges/fetch-challenges-multiple-private-graphql.js

const sanitizeAlias = (str) => str.replace(/-/g, '_')

const createQueryPart = (owner, repo) => {
  const alias = sanitizeAlias(`${owner}_${repo}`)
  return `
    ${alias}: repository(owner: "${owner}", name: "${repo}") {
      issues(first: 100, states: OPEN) {
        nodes {
          id
          title
          url
          author {
            login
            avatarUrl
          }
          labels(first: 10) {
            nodes {
              name
            }
          }
          commentCount: comments {
            totalCount
          }
          commentsDetailed: comments(first: 10) {
            nodes {
              id
              author {
                login
                avatarUrl
              }
              body
              createdAt
            }
          }
          assignees(first: 10) {
            nodes {
              login
              avatarUrl
            }
          }
          milestone {
            title
          }
          createdAt
          updatedAt
          projectCards(first: 10) {
            nodes {
              project {
                name
                url
              }
            }
          }
        }
      }
    }
  `
}

export const fetchGithubIssues = async (
  repoOwnerArray: RepoOwnerArray,
  githubAccessToken: string,
): Promise<GithubIssuesPerRepo[]> => {
  let query = '{'
  repoOwnerArray.forEach(({ owner, repo }) => {
    query += createQueryPart(owner, repo)
  })
  query += '}'

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'User-Agent': 'NodeJS-Script',
      Authorization: `Bearer ${githubAccessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    throw new Error(`GitHub API responded with status ${response.status}`)
  }

  const responseData = await response.json()

  const parsedIssues: GithubIssuesPerRepo[] = repoOwnerArray.map(
    ({ owner, repo }) => {
      const alias = sanitizeAlias(`${owner}_${repo}`)
      const rawIssues = responseData.data[alias]?.issues.nodes || []
      return {
        [`${owner}/${repo}`]: rawIssues.map(
          (issue): GithubIssue => ({
            id: issue.id,
            title: issue.title,
            url: issue.url,
            user: {
              login: issue.author.login,
              avatarUrl: issue.author.avatarUrl,
            },
            labels: issue.labels.nodes.map((label) => label.name),
            commentCount: issue.commentCount.totalCount,
            comments: issue.commentsDetailed.nodes.map((comment) => ({
              id: comment.id,
              author: {
                login: comment.author.login,
                avatarUrl: comment.author.avatarUrl,
              },
              body: comment.body,
              createdAt: comment.createdAt,
            })),
            assignees: issue.assignees.nodes,
            milestone: issue.milestone ? issue.milestone.title : null,
            created_at: issue.createdAt,
            updated_at: issue.updatedAt,
            projects: issue.projectCards.nodes.map((card) => ({
              name: card.project.name,
              url: card.project.url,
            })),
          }),
        ),
      }
    },
  )

  return parsedIssues
}
