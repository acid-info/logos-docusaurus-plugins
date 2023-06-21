import React, { useContext } from 'react'

export type BlogPageContextType = {
  type?: 'list' | 'page'
  blogTitle?: string
  blogDescription?: string
}

export const BlogPage = React.createContext<BlogPageContextType>({
  type: 'list',
  blogTitle: '',
  blogDescription: '',
})

export const useBlogPage = () => useContext(BlogPage)
