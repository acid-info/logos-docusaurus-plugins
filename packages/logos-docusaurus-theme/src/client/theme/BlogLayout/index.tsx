import clsx from 'clsx'
import React from 'react'

import BlogLayout from '@docusaurus/theme-classic/lib/theme/BlogLayout'
import { Props } from '@theme/BlogLayout'
import { ensureTrailingSlash } from '../../lib/string.utils'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

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

  return (
    <BlogLayout
      {...props}
      wrapperClassName={clsx(
        'blog-wrapper',
        isIndexPage && 'blog-wrapper--index',
      )}
    />
  )
}
