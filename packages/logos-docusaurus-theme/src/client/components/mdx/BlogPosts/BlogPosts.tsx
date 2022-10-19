import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
// @ts-ignore
import GhostContentAPI from '@tryghost/content-api'
import { LinkButton } from '@logos-theme/components/Button/LinkButton'

type TProps = {
  children: React.ReactNode
}

interface IGhostAuthor {
  url: string
  name: string
}

interface IGhostBlogPost {
  title: string
  excerpt: string
  url: string
  html: string
  updated_at: string
  authors: IGhostAuthor[]
}

const useGhostBlogPosts = (limit: number = 10) => {
  const {
    siteConfig: {
      customFields: { ghostAPiKey },
    },
  } = useDocusaurusContext() as any
  const [posts, setPosts] = useState<IGhostBlogPost[]>([])

  useEffect(() => {
    const api = new GhostContentAPI({
      url: 'https://blog.codex.storage',
      key: ghostAPiKey,
      version: 'v2.0',
    })
    api.posts
      .browse({ limit, include: 'tags,authors' })
      .then((_posts: IGhostBlogPost[]) => {
        setPosts(_posts)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return posts
}

type TBlogPostProps = {
  post: IGhostBlogPost
}

const BlogPost = ({ post }: TBlogPostProps) => (
  <div className={clsx('card', styles.blogpost)}>
    <h3 className={'sans'}>{post.title}</h3>
    <p
      className={''}
      dangerouslySetInnerHTML={{
        __html: `${post.html.split(' ').slice(0, 23).join(' ')}...`,
      }}
    />
    <div className={styles.blogpostMeta}>
      <small className={'sans'}>
        by{' '}
        {post.authors.map((a, i) => (
          <a href={a.url} key={`a-${i}`}>
            {a.name}
          </a>
        ))}
      </small>
      <small>
        <time> - {formatDate(post.updated_at)}</time>
      </small>
    </div>
    <a>
      <LinkButton
        className={'button--secondary'}
        linkProps={{ href: post.url }}
      >
        Learn More
      </LinkButton>
    </a>
  </div>
)

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const m = date.toLocaleString('default', { month: 'short' })
  const d = date.getDay()
  const y = date.getFullYear()
  return `${m} ${d}, ${y}`
}

export const BlogPosts = ({ children }: TProps): JSX.Element => {
  const posts = useGhostBlogPosts()

  return (
    <section className={styles.blogpostsWrapper}>
      <div className={styles.blogposts}>
        {posts.map((post, i) => (
          <BlogPost key={`p-${i}`} post={post} />
        ))}
      </div>
    </section>
  )
}
