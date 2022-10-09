import { useLocation } from '@docusaurus/router'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { useSearch } from './hooks/useSearch'
import styles from './SearchBar.module.scss'
import { SearchInput } from './SearchInput'
import { SearchResults } from './SearchResults'
import { SearchResultsContainer } from './SearchResultsContainer'
import { SearchResult } from './types'

export const SearchBar: React.FC<{}> = ({}) => {
  const search = useSearch()
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const location = useLocation()

  const [input, setInput] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [showResultsContainer, setShowResultsContainer] = useState(false)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const onInputFocus = () => {
    setShowResultsContainer(true)
  }

  const onInputCancel = () => {
    setShowResultsContainer(false)
  }

  const onClickOutsideResultsContainer = (event: Event) => {
    if (!event.composedPath().find((el) => el === ref.current)) onInputCancel()
  }

  const onClear = () => {
    setInput('')
    inputRef.current.focus()
  }

  const query = async (input: string) => {
    const { results } = await search.query(input)
    setResults(results)
    setShowResultsContainer(true)
  }

  useEffect(() => {
    if (input.length > 0) query(input)
    else setResults([])
  }, [input])

  useEffect(() => {
    if (showResultsContainer) {
      setShowResultsContainer(false)
    }
  }, [location.key])

  return (
    <div ref={ref} className={clsx(styles.root)}>
      <SearchInput
        value={input}
        active={showResultsContainer}
        inputProps={{
          ref: inputRef,
          placeholder: 'Enter...',
        }}
        onChange={onInputChange}
        onFocus={onInputFocus}
        onCancel={onInputCancel}
      />
      <SearchResultsContainer
        visible={showResultsContainer && input.length > 0}
        inputRef={inputRef}
        onClickOutside={onClickOutsideResultsContainer}
      >
        <SearchResults results={results} onClear={onClear} />
      </SearchResultsContainer>
    </div>
  )
}
