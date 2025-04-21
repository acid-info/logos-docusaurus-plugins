import { Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React, { ReactElement } from 'react'
import styles from './styles.module.scss'

type SubtitleProps = {
  content: string
}

export const Subtitle = ({ content }: SubtitleProps): ReactElement => {
  return (
    <Typography variant="h5" className={clsx(styles.blogPostSubtitle)}>
      {content}
    </Typography>
  )
}
