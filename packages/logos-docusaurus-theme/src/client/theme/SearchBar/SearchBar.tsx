import { CloseIcon, IconButton, SearchIcon } from '@acid-info/lsd-react'
import React, { useEffect, useRef, useState } from 'react'
import { Modal } from '../../components/Modal/Modal'
import { usePersistedHistory } from '../../lib/usePersistedHistory'
import { useWindowEventListener } from '../../lib/useWindowEventListener'
import { useSearch } from './hooks/useSearch'
import styles from './SearchBar.module.scss'
import { SearchHistory } from './SearchHistory/SearchHistory'
import { SearchInput } from './SearchInput/SearchInput'
import { SearchResults } from './SearchResults/SearchResults'
import { SearchResult, SearchResultGroupItem } from './types'

export const SearchBar: React.FC<{}> = ({}) => {
  const history = usePersistedHistory<SearchResultGroupItem>('search', {
    unique: true,
    equals: (a, b) => a.title === b.title && a.href === b.href,
    maxItems: 10,
  })
  const search = useSearch()
  const ref = useRef<HTMLDivElement>(null)

  const [input, setInput] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [displayModal, setDisplayModal] = useState(false)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const focusOnInput = () => {
    const el = ref.current
    if (!el) return

    const inputEl = el.querySelector('input')
    if (inputEl)
      setTimeout(() => {
        inputEl.focus()
      }, 50)
  }

  const onClear = () => {
    setInput('')
  }

  const query = async (input: string) => {
    const { results } = await search.query(input)
    setResults(results)
  }

  useEffect(() => {
    if (input.length > 0) query(input)
    else setResults([])
  }, [input])

  useEffect(() => {
    displayModal ? focusOnInput() : setInput('')
  }, [displayModal])

  const onNavigate = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: SearchResultGroupItem,
  ) => {
    e.preventDefault()
    setDisplayModal(false)
    history.add(item)
    window.location.href = item.href
  }

  useWindowEventListener(
    'keydown',
    (event) => {
      if ((event.ctrlKey || event.metaKey) && event.code === 'KeyK') {
        event.preventDefault()
        setDisplayModal(true)
      }
    },
    {},
    [],
  )

  return (
    <>
      <IconButton onClick={() => setDisplayModal(true)} size="medium">
        <SearchIcon />
      </IconButton>
      <Modal
        keepMounted
        id="search-modal"
        open={displayModal}
        onClose={() => setDisplayModal(false)}
        className={styles.modal}
      >
        <div className={styles.header}>
          <SearchInput
            containerRef={ref}
            onClear={onClear}
            value={input}
            onChange={onInputChange}
          />
          <IconButton
            className={styles.closeButton}
            size="medium"
            onClick={() => setDisplayModal(false)}
          >
            <CloseIcon color="primary" />
          </IconButton>
        </div>
        {input.length > 0 && (
          <SearchResults results={results} onNavigate={onNavigate} />
        )}
        {input.length === 0 && (
          <SearchHistory
            history={history.list ?? []}
            onRemove={history.removeByIndex}
            onClose={() => setDisplayModal(false)}
          />
        )}
      </Modal>
    </>
  )
}
