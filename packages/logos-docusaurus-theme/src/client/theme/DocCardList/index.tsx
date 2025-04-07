import DocCardList from '@docusaurus/theme-classic/lib/theme/DocCardList'
import type { Props } from '@theme/DocCardList'
import clsx from 'clsx'
import React, { ReactElement } from 'react'
import styles from './DocCardList.module.scss'

export default function DocCardListWrapper(props: Props): ReactElement {
  console.log(props)
  return (
    <DocCardList
      {...props}
      className={clsx(props.className, 'doc-card-list', styles.root)}
    />
  )
}
