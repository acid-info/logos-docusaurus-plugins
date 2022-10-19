import clsx from 'clsx'
import React, { RefObject, useRef } from 'react'
import { useClickAway } from 'react-use'
import styles from './SearchResultsContainer.module.scss'

export type SearchResultsContainerProps = React.HTMLProps<HTMLDivElement> & {
  visible?: boolean
  inputRef?: RefObject<HTMLInputElement>
  onClickOutside: (event: Event) => void
}

export const SearchResultsContainer: React.FC<SearchResultsContainerProps> = ({
  visible,
  inputRef,
  className,
  onClickOutside,
  children,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useClickAway(ref, (event) => {
    onClickOutside(event)
  })

  return (
    <div
      ref={ref}
      className={clsx(styles.root, visible && styles.visible, className)}
    >
      {children}
    </div>
  )
}
