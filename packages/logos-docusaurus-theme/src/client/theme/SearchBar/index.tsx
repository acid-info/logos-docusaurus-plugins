import { useActivePlugin } from '@docusaurus/plugin-content-docs/lib/client/index.js'
import React from 'react'
import { SearchBar } from './SearchBar'

const SearchBarWrapper: React.FC = () => {
  const activePlugin = useActivePlugin()
  if (!activePlugin) return <></>

  // temporarily disable search bar
  return <></>

  // return typeof window === 'undefined' ? <></> : <SearchBar />
}

export default SearchBarWrapper
