import { Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import { IconClose, IconHistory } from '../../../components/Icon/Icon'
import { SearchResultMessage } from '../SearchResultMessage/SearchResultMessage'
import { SearchResultGroupItem } from '../types'
import styles from './SearchHistory.module.scss'

export type SearchHistoryProps = React.HTMLProps<HTMLDivElement> & {
  history: SearchResultGroupItem[]
  onRemove: (index: number) => void
  onClose?: () => void
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  history: list = [],
  onRemove,
  onClose,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={clsx(
        className,
        styles.root,
        list.length === 0 && styles.empty,
      )}
      {...props}
    >
      {list.length === 0 ? (
        <SearchResultMessage>No recent searches</SearchResultMessage>
      ) : (
        <>
          <Typography
            className={styles.title}
            variant="subtitle2"
            component="div"
          >
            Recent
          </Typography>
          {list.map((item, index) => (
            <div key={index} className={styles.item}>
              <IconHistory />
              <Typography
                variant="subtitle2"
                component="a"
                href={item.href}
                className={styles.itemTitle}
                dangerouslySetInnerHTML={{ __html: item.title }}
                onClick={() => onClose && onClose()}
              />
              <button className="clean-btn" onClick={() => onRemove(index)}>
                <IconClose />
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
