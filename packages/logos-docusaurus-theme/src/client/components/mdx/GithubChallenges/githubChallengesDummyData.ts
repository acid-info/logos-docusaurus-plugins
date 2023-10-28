import { GithubIssue } from './useFetchGithubIssues'

// Only for dev purposes - prevents making multiple requests to the API while developing.
export const dummyGithubIssue: GithubIssue = {
  id: '12345',
  title: 'Bug in pagination',
  body: 'When navigating to the second page, the first item repeats.',
  url: 'https://github.com/user/repo/issues/12345',
  labels: [
    {
      name: 'bug',
    },
    {
      name: 'frontend',
    },
  ],
  comments: [
    {
      body: 'I have also noticed this issue. Working on a fix now.',
    },
    {
      body: 'Any updates on this?',
    },
    {
      body: 'I like turtles.',
    },
  ],
  participants: [
    {
      login: 'alice123',
      avatarUrl:
        'https://avatars.githubusercontent.com/u/8811422?u=b4aec0f11a78abe3b71c42e4adfba3ebd61f34aa&v=4',
    },
    {
      login: 'bob456',
      avatarUrl:
        'https://avatars.githubusercontent.com/u/8811422?u=b4aec0f11a78abe3b71c42e4adfba3ebd61f34aa&v=4',
    },
    {
      login: 'jaquim',
      avatarUrl:
        'https://avatars.githubusercontent.com/u/8811422?u=b4aec0f11a78abe3b71c42e4adfba3ebd61f34aa&v=4',
    },
  ],
  project: {
    name: 'Awesome Project',
  },
  achievement: 'Solved critical frontend bug',
  milestone: 'v1.0.0',
}
