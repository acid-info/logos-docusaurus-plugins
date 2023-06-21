import React from 'react'
import { BlogPostProvider } from '@docusaurus/theme-common/internal'
import BlogPostItem from '@theme/BlogPostItem'
import { Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import styles from './styles.module.scss'
import { useBlogPluginData } from '../../lib/useBlogPluginData'

export default function BlogPostItems({
  items,
  component: BlogPostItemComponent = BlogPostItem,
}) {
  const plugin = useBlogPluginData()

  return (
    <>
      <div className={clsx(styles.header)}>
        {plugin?.blogTitle && (
          <Typography variant="h3">{plugin.blogTitle}</Typography>
        )}
        {plugin?.blogDescription && (
          <Typography variant="body2">{plugin.blogDescription}</Typography>
        )}
      </div>

      {items.map(({ content: BlogPostContent }) => (
        <BlogPostProvider
          key={BlogPostContent.metadata.permalink}
          content={BlogPostContent}
        >
          <BlogPostItemComponent>
            <BlogPostContent />
          </BlogPostItemComponent>
        </BlogPostProvider>
      ))}
    </>
  )
}
