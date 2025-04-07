import React, { ReactElement } from 'react'
import clsx from 'clsx'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import type { Props } from '@theme/BlogPostItem/Header/Authors'
import styles from './styles.module.css'
import { Typography } from '@acid-info/lsd-react'
import BlogPostItemHeaderAuthor from '../Author'

// Component responsible for the authors layout
export default function BlogPostItemHeaderAuthors({
  className,
}: Props): ReactElement | null {
  const {
    metadata: { authors },
    assets,
  } = useBlogPost()
  const authorsCount = authors.length
  if (authorsCount === 0) {
    return null
  }
  const imageOnly = authors.every(({ name }) => !name)
  return (
    <div className={clsx(className)}>
      <Typography variant="body2">{'by '}</Typography>
      {authors.map((author, idx) => (
        <div
          className={clsx(
            !imageOnly && 'col col--6',
            imageOnly ? styles.imageOnlyAuthorCol : styles.authorCol,
          )}
          key={idx}
        >
          <BlogPostItemHeaderAuthor
            author={{
              ...author,
              // Handle author images using relative paths
              imageURL: assets.authorsImageUrls[idx] ?? author.imageURL,
            }}
            className={''}
          />
        </div>
      ))}
    </div>
  )
}
