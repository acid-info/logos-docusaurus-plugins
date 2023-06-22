import { createContext, useContext } from 'react'

import type { Props as BlogListPageProps } from '@theme/BlogListPage'

export type BlogPageContextType = {
  type: 'list' | null
  props: BlogListPageProps
}

export const BlogPageContext = createContext<BlogPageContextType>({
  type: null as any,
  props: null as any,
})

export const useBlogPageData = () => useContext(BlogPageContext)
