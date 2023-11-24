import {
  Grid,
  GridProps,
} from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
import React from 'react'
import { ComponentCard, ComponentCardProps } from '../ComponentCard'
import styles from './ComponentGrid.module.scss'
import clsx from 'clsx'

export type ComponentGridProps = GridProps & {
  list: ComponentCardProps[]
}

export const ComponentGrid: React.FC<ComponentGridProps> = ({
  list = [],
  ...props
}) => {
  return (
    <Grid
      md={{ cols: 2, wrap: true, gap: '0' }}
      {...props}
      className={clsx(styles.root, props.className)}
    >
      {list.map((props, idx) => (
        <Grid.Item
          md={1}
          key={idx}
          className={clsx(
            styles.item,
            idx >= list.length - 2 && styles.lastRow,
          )}
        >
          <ComponentCard {...props} />
        </Grid.Item>
      ))}
    </Grid>
  )
}
