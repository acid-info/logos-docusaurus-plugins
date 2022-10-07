import { clsx } from 'clsx'
import React from 'react'
import styles from './style.module.scss'

type TProps = {
  children: React.ReactNode
}

export const Quote = (props: TProps): JSX.Element => {
  const { children } = props

  return (
    <div className={clsx('alert', styles.quoteContainer)}>
      <div className={styles.quoteMark}>
        <div />
      </div>
      <div className={styles.quoteContent}>{children}</div>
    </div>
  )
}
