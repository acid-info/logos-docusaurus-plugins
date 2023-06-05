import ErrorBoundary from '@docusaurus/ErrorBoundary'
import { useActivePlugin } from '@docusaurus/plugin-content-docs/lib/client/index.js'
import React from 'react'
import { SearchBar } from './SearchBar'

const SearchBarWrapper: React.FC = () => {
  const activePlugin = useActivePlugin()
  if (!activePlugin) return <></>

  return typeof window === 'undefined' ? (
    <></>
  ) : (
    <ErrorBoundary fallback={() => <></>}>
      <SearchBar />
    </ErrorBoundary>
  )
}

export default SearchBarWrapper
