import React from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'

type TProps = {
  children: React.ReactNode
}

export const FeatureList = ({ children }: TProps): JSX.Element => {
  return (
    <section className={styles.FeatureList}>
      <div
        className={clsx(
          styles.FeatureListContainer,
          styles[`n_${React.Children.count(children)}`],
        )}
      >
        {children}
      </div>
    </section>
  )
}
