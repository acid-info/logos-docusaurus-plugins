import clsx from 'clsx'
import React from 'react'
import { AppCard, AppCardProps, Grid, GridProps } from '..'
import './PoweredBy.scss'

export type PoweredByProps = GridProps & {
  items?: AppCardProps[]
}

export const PoweredBy: React.FC<PoweredByProps> = ({
  items = [],
  className,
  ...props
}) => {
  return (
    <Grid
      className={clsx(className, 'mdx-powered-by')}
      xs={{ cols: 1, wrap: true, gap: '0 1rem' }}
      lg={{ cols: 2 }}
      {...props}
    >
      {items.map((item, index) => (
        <Grid.Item key={index} xs={1}>
          <AppCard {...item} />
        </Grid.Item>
      ))}
    </Grid>
  )
}
