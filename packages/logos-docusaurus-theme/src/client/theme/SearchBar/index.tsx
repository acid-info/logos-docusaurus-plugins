import ErrorBoundary from '@docusaurus/ErrorBoundary'
import React from 'react'
import { SearchBar } from './SearchBar'

const SearchBarWrapper: React.FC = () => {
  return typeof window === 'undefined' ? (
    <></>
  ) : (
    <ErrorBoundary fallback={() => <></>}>
      <SearchBar />
    </ErrorBoundary>
  )
}

export default SearchBarWrapper
