import clsx from 'clsx'
import React, { ReactElement } from 'react'
import { Props } from '@theme/BlogLayout'
import Layout from '@theme/Layout'
import BlogSidebar from '@theme/BlogSidebar'
import { useBlogPageData } from './BlogPage.context'
import { BlogHeader } from '../BlogHeader'

export default function BlogLayout(props: Props): ReactElement {
  const { sidebar, toc, children, ...layoutProps } = props
  const { type, props: blogPageProps } = useBlogPageData()
  const isIndexPage = type === 'list'
  const hasSidebar = sidebar && sidebar.items.length > 0
  const metadata = blogPageProps?.metadata

  return (
    <Layout
      {...layoutProps}
      wrapperClassName={clsx(
        'blog-wrapper',
        isIndexPage && 'blog-wrapper--index',
      )}
    >
      {isIndexPage && (
        <BlogHeader
          title={metadata?.blogTitle}
          description={metadata?.blogDescription}
        />
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
