import clsx from 'clsx'
import React, { MutableRefObject, useMemo } from 'react'
import { SearchResultGroup } from '../SearchResultGroup'
import { SearchResultItem } from '../SearchResultItem'
import { SearchResult } from '../types'
import { groupSearchResult } from '../utils/groupSearchResult'
import styles from './SearchResults.module.scss'

const divider = (
  <div className={styles.divider}>
    <div />
  </div>
)

export type SearchResultsProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  'results'
> & {
  inputRef?: MutableRefObject<HTMLInputElement>
  results: SearchResult[]
  onClear: () => void
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onClear,
  className,
  ...props
}) => {
  const total = results.length
  const grouped = useMemo(() => groupSearchResult(results), [results])

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <span>{total} results</span>
        <button className={clsx('clean-btn')} onClick={onClear}>
          Clear
        </button>
      </div>

      {divider}

      <div className={clsx(styles.groups, 'hidden-scrollbar')}>
        {grouped.map(([category, items], index) => (
          <React.Fragment key={index}>
            <SearchResultGroup className={styles.group} title={category}>
              {items.map((item, itemIndex) => (
                <SearchResultItem
                  key={itemIndex}
                  type={item.type}
                  href={item.href}
                  title={item.title}
                  content={item.content}
                />
              ))}
            </SearchResultGroup>

            {divider}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
