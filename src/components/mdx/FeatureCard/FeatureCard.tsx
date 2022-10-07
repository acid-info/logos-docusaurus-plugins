import React from 'react'
import styles from './style.module.scss'

type TProps = {
  title: string
  text: string
  index?: string
  link?: string
  children: React.ReactNode
}

const ln = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

export const FeatureCard = (props: TProps): JSX.Element => {
  const { index, text, title, link } = props

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {index && <span className={styles.latinNumber}>{ln[index]}</span>}
        <h3>{title}</h3>
      </div>
      <p className={styles.cardText}>{text}</p>
    </div>
  )
}
