import { useBlogPost } from '@docusaurus/theme-common/internal'
import { translate } from '@docusaurus/Translate'
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info'
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title'
import React from 'react'
import { useBlogPluginData } from '../../../lib/useBlogPluginData'
import { BreadcrumbsBase } from '../../DocBreadcrumbs/index'
import { Typography } from '@acid-info/lsd-react'
import styles from './Title/styles.module.scss'
import clsx from 'clsx'

export default function BlogPostItemHeader(): JSX.Element {
  const {
    metadata: { title, permalink, frontMatter },
    isBlogPostPage,
    assets,
  } = useBlogPost()

  const plugin = useBlogPluginData()
  const routeBasePath = plugin.routeBasePath ?? '/blog'

  const _description = (
    <Typography
      variant="h6"
      className={clsx(
        isBlogPostPage ? styles.blogPostDescription : styles.blogDescription,
      )}
    >
      {frontMatter.description}
    </Typography>
  )

  return (
    <header>
      {isBlogPostPage && (
        <BreadcrumbsBase
          homePage={translate({
            id: 'theme.blog.breadcrumbs.listPageLabel',
            message: 'All posts',
          })}
          homePageLink={routeBasePath}
          breadcrumbs={[
            {
              type: 'link',
              href: permalink,
              label: title,
            },
          ]}
        />
      )}
      <BlogPostItemHeaderTitle />
      {frontMatter?.description && isBlogPostPage && _description}
      <BlogPostItemHeaderInfo />
      {frontMatter?.description && !isBlogPostPage && _description}
      {isBlogPostPage && <hr className="blog-divider" />}
    </header>
  )
}
