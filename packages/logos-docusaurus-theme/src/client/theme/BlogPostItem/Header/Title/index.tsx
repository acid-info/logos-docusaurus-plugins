import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import { useBlogPost } from '@docusaurus/theme-common/internal'
import styles from './styles.module.scss'

export default function BlogPostItemHeaderTitle({ className }) {
  const { metadata, isBlogPostPage } = useBlogPost()
  const { permalink, title } = metadata
  const TitleHeading = isBlogPostPage ? 'h1' : 'h6'

  return (
    <TitleHeading
      className={clsx(isBlogPostPage && styles.blogPostTitle, className)}
      itemProp="headline"
    >
      {isBlogPostPage ? (
        title
      ) : (
        <Link itemProp="url" to={permalink}>
          {title}
        </Link>
      )}
    </TitleHeading>
  )
}
