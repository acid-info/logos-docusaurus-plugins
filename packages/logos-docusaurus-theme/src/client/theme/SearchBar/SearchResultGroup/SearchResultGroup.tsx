import { Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import styles from './SearchResultGroup.module.scss'

export type SearchResultGroupProps = React.HTMLProps<HTMLDivElement> & {
  title: string
}

export const SearchResultGroup: React.FC<SearchResultGroupProps> = ({
  className,
  title = '',
  children,
  ...props
}) => {
  return (
    <div className={clsx(styles.root, className)} {...props}>
      <div>
        <Typography variant="subtitle2">{title}</Typography>
      </div>
      <ul>{children}</ul>
    </div>
  )
}
