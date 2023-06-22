import clsx from 'clsx'
import React from 'react'
import { Props } from '@theme/BlogLayout'

import { Typography } from '@acid-info/lsd-react'
import styles from './styles.module.scss'
import Layout from '@theme/Layout'
import BlogSidebar from '@theme/BlogSidebar'
import { useBlogPageData } from './BlogPage.context'

export default function BlogLayoutWrapper(props: Props): JSX.Element {
  const { sidebar, toc, children, ...layoutProps } = props
  const { type, props: blogPageProps } = useBlogPageData()
  const isIndexPage = type === 'list'
  const hasSidebar = sidebar && sidebar.items.length > 0
  const metadata = blogPageProps?.metadata // desstructing blogTitle & blogDescription raises an error
  console.log('isIndexPage', isIndexPage)
  return (
    <Layout
      {...layoutProps}
      wrapperClassName={clsx(
        'blog-wrapper',
        isIndexPage && 'blog-wrapper--index',
      )}
    >
      {isIndexPage && (
        <div className={clsx(styles.blogHeader)}>
          {metadata?.blogTitle && (
            <Typography variant="h3" className={clsx(styles.blogTitle)}>
              {metadata?.blogTitle}
            </Typography>
          )}
          {metadata?.blogDescription && (
            <Typography
              variant="body2"
              className={clsx(styles.blogDescription)}
            >
              {metadata?.blogDescription}
            </Typography>
          )}
        </div>
      )}

      <div className="container margin-vert--lg">
        <div className="row">
          <BlogSidebar sidebar={sidebar} />
          <main
            className={clsx('col', {
              'col--7': hasSidebar,
              'col--9 col--offset-1': !hasSidebar,
            })}
            itemScope
            itemType="http://schema.org/Blog"
          >
            {children}
          </main>
          {toc && <div className="col col--2">{toc}</div>}
        </div>
      </div>
    </Layout>
  )
}
