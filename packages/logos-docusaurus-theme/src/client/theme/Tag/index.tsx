import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import type { Props } from '@theme/Tag'

import styles from './styles.module.css'
import { Tag as LsdTag } from '@acid-info/lsd-react'

export default function Tag({ permalink, label, count }: Props): JSX.Element {
  return (
    <Link
      href={permalink}
      className={clsx(count ? styles.tagWithCount : styles.tagRegular)}
    >
      <LsdTag disabled={false} size="small">
        {label}
        {count && <span>{count}</span>}
      </LsdTag>
    </Link>
  )
}
