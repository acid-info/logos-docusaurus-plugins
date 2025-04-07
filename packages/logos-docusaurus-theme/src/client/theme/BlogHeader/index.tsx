import { Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React, { ReactElement } from 'react'
import styles from './styles.module.scss'

type BlogHeaderProps = {
  title: string
  description: string
}

export const BlogHeader = ({
  title,
  description,
}: BlogHeaderProps): ReactElement => {
  return (
    <div className={clsx(styles.blogHeader)}>
      {title && (
        <Typography variant="h3" className={clsx(styles.blogTitle)}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body2" className={clsx(styles.blogDescription)}>
          {description}
        </Typography>
      )}
    </div>
  )
}
