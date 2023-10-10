import clsx from 'clsx'
import React from 'react'
import { Grid, GridProps, ShowcaseCard, ShowcaseCardProps } from '..'
import './Showcase.scss'

export type ShowcaseProps = GridProps & {
  items: ShowcaseCardProps[]
}

export const Showcase: React.FC<ShowcaseProps> = ({
  items = [],
  className,
  ...props
}) => {
  return (
    <Grid
      className={clsx(className, 'mdx-showcase')}
      xs={{ cols: 2, wrap: true, gap: '1.5rem 1em' }}
      lg={{ cols: 3, gap: '1rem' }}
      {...props}
    >
      {items.map((item, index) => {
        return (
          <Grid.Item key={index} className="mdx-showcase__item" xs={1}>
            <ShowcaseCard {...item} />
          </Grid.Item>
        )
      })}
    </Grid>
  )
}
