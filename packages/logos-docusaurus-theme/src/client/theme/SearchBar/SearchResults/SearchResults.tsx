import clsx from 'clsx'
import React, { useMemo } from 'react'
import { SearchResultGroup } from '../SearchResultGroup'
import { SearchResultItem } from '../SearchResultItem'
import { SearchResultMessage } from '../SearchResultMessage/SearchResultMessage'
import { SearchResult, SearchResultGroupItem } from '../types'
import { groupSearchResult } from '../utils/groupSearchResult'
import styles from './SearchResults.module.scss'

export type SearchResultsProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  'results'
> & {
  results: SearchResult[]
  onNavigate?: (e: React.MouseEvent<any>, item: SearchResultGroupItem) => void
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  className,
  onNavigate,
  ...props
}) => {
  const grouped = useMemo(() => groupSearchResult(results), [results])
  const total = grouped.length

  return (
    <div className={clsx(styles.root, total === 0 && styles.noResults)}>
      {total === 0 && <SearchResultMessage>No result.557</SearchResultMessage>}
      <div className={clsx(styles.groups)}>
        {grouped.map(([category, items], index) => (
          <React.Fragment key={index}>
            <SearchResultGroup className={styles.group} title={category}>
              {items.map((item, itemIndex) => (
                <SearchResultItem
                  key={itemIndex}
                  type={item.type}
                  level={item.level}
                  href={item.href}
                  title={item.title}
                  content={item.content}
                  linkProps={
                    onNavigate ? { onClick: (e) => onNavigate(e, item) } : {}
                  }
                />
              ))}
            </SearchResultGroup>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
