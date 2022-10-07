import React from 'react'
import styles from './style.module.scss'

type TProps = {
  children: React.ReactNode
}

export const FeatureList = ({ children }: TProps): JSX.Element => {
  return <div className={styles.FeatureList}>{children}</div>
}
