import BlogListPage from '@docusaurus/theme-classic/lib/theme/BlogListPage'
import React from 'react'
import { BlogPageContext } from '../BlogLayout/BlogPage.context'

export default function BlogListPageWrapper(props) {
  return (
    <BlogPageContext.Provider value={{ type: 'list', props }}>
      <BlogListPage {...props} />
    </BlogPageContext.Provider>
  )
}
