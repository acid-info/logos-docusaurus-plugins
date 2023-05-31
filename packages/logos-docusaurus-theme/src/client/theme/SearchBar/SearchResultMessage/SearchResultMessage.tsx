import { Typography, TypographyProps } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import styles from './SearchResultMessage.module.scss'

export type SearchResultMessageProps = TypographyProps & {}

export const SearchResultMessage: React.FC<SearchResultMessageProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Typography
      className={clsx(className, styles.root)}
      variant="subtitle2"
      component="div"
      {...(props as any)}
    >
      <span>{children}</span>
    </Typography>
  )
}
