import { clsx } from 'clsx'
import React from 'react'
import styles from './style.module.scss'

type TProps = {
  title: string
  text: string
  index: string
  link?: string
  children: React.ReactNode
}

const ln = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

export const FeatureCard = (props: TProps): JSX.Element => {
  const { index, text, title, link } = props

  return (
    <div className={clsx('card', styles.cardContainer)}>
      <div className={clsx('card__header', styles.cardHeader)}>
        {index !== null && (
          <div className={clsx('sub6', 'sans', styles.latinNumber)}>
            <span>{ln[index]}</span>
          </div>
        )}
        <h4 className={styles.cardTitle}>{title}</h4>
      </div>
      <p className={clsx('sans', styles.cardDescription)}>{text}</p>
    </div>
  )
}
