import React from 'react'
import { SearchBar } from './SearchBar'

const SearchBarWrapper: React.FC = () => {
  return typeof window === 'undefined' ? <></> : <SearchBar />
}

export default SearchBarWrapper
