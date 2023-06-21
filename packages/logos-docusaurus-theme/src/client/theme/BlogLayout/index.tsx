import clsx from 'clsx'
import React from 'react'
import { Props } from '@theme/BlogLayout'
import { ensureTrailingSlash } from '../../lib/string.utils'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { useBlogPluginData } from '@logos-theme/lib/useBlogPluginData'

import { Typography } from '@acid-info/lsd-react'
import styles from './styles.module.scss'
import Layout from '@theme/Layout'
import BlogSidebar from '@theme/BlogSidebar'

const useIsIndexPage = (props: Props) => {
  if (typeof window === 'undefined') return false

  const ctx = useDocusaurusContext()
  const activePlugin = ctx.siteConfig.plugins.find(
    (plugin) =>
      plugin === '"@docusaurus/plugin-content-blog"' ||
      plugin?.[0] === '@docusaurus/plugin-content-blog',
  )

  const routeBasePath = activePlugin?.[1]?.routeBasePath ?? '/blog'

  return (
    ensureTrailingSlash(routeBasePath) ===
    ensureTrailingSlash(window.location.pathname)
  )
}

export default function BlogLayoutWrapper(props: Props): JSX.Element {
  const { sidebar, toc, children, ...layoutProps } = props
  const isIndexPage = useIsIndexPage(props)
  const hasSidebar = sidebar && sidebar.items.length > 0

  const plugin = useBlogPluginData()

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
          {plugin?.blogTitle && (
            <Typography variant="h3" className={clsx(styles.blogTitle)}>
              {plugin.blogTitle}
            </Typography>
          )}
          {plugin?.blogDescription && (
            <Typography
              variant="body2"
              className={clsx(styles.blogDescription)}
            >
              {plugin.blogDescription}
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
