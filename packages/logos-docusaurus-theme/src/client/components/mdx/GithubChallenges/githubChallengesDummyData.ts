import { GithubIssue } from '@acid-info/logos-docusaurus-preset/src/types/github'

// Only for dev purposes - prevents making multiple requests to the API while developing.
export const dummyGithubIssue: GithubIssue = {
  id: '12345',
  title: 'Bug in pagination',
  body: 'When navigating to the second page, the first item repeats.',
  url: 'https://github.com/user/repo/issues/12345',
  user: {
    login: 'user123',
    avatarUrl: 'https://avatars.githubusercontent.com/u/8811422?v=4',
  },
  labels: ['bug', 'frontend'],
  commentCount: 3,
  comments: [
    {
      id: 'c1',
      author: 'alice123',
      body: 'I have also noticed this issue. Working on a fix now.',
      createdAt: '2021-01-01T12:00:00Z',
    },
    {
      id: 'c2',
      author: 'bob456',
      body: 'Any updates on this?',
      createdAt: '2021-01-02T15:30:00Z',
    },
    {
      id: 'c3',
      author: 'jaquim',
      body: 'I like turtles.',
      createdAt: '2021-01-03T09:45:00Z',
    },
  ],
  assignees: [
    {
      login: 'alice123',
      avatarUrl: 'https://avatars.githubusercontent.com/u/8811422?v=4',
    },
    {
      login: 'bob456',
      avatarUrl: 'https://avatars.githubusercontent.com/u/8811422?v=4',
    },
  ],
  milestone: 'v1.0.0',
  created_at: '2020-12-31T11:00:00Z',
  updated_at: '2021-01-04T13:00:00Z',
  projects: [
    {
      name: 'Awesome Project',
    },
  ],
}
