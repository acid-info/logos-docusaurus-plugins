import { Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.scss'

type SubtitleProps = {
  content: string
}

export const Subtitle = ({ content }: SubtitleProps): JSX.Element => {
  return (
    <Typography variant="h6" className={clsx(styles.blogPostSubtitle)}>
      {content}
    </Typography>
  )
}
