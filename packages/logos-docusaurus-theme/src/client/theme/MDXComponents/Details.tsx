import React, { useState } from 'react'
import styles from './style.module.scss'
import { Collapse } from '@acid-info/lsd-react'

export default function MDXDetails(props) {
  const items = React.Children.toArray(props.children)
  const [open, setOpen] = useState(true)
  // Split summary item from the rest to pass it as a separate prop to the
  // Details theme component

  const summary = items.find(
    (item) => React.isValidElement(item) && item.props?.mdxType === 'summary',
  )

  const children = <>{items.filter((item) => item !== summary)}</>

  return (
    <Collapse
      {...props}
      open={open}
      onChange={(value) => setOpen(value)}
      label={summary}
      className={styles.collapse}
    >
      {children}
    </Collapse>
  )
}
