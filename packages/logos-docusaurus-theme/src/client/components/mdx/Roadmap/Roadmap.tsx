import { Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import { Grid } from '..'
import { TimelineItem, TimelineItemProps } from '../TimelineItem'
import './Roadmap.scss'

export type RoadmapProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  title: React.ReactNode
  description?: React.ReactNode
  alignment?: 'top' | 'bottom'
  timeline?: Partial<TimelineItemProps>[]
}

export const Roadmap: React.FC<RoadmapProps> = ({
  title,
  description,
  alignment = 'bottom',
  timeline = [],
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={clsx(
        className,
        'mdx-roadmap',
        `mdx-roadmap--${alignment}-aligned`,
      )}
      {...props}
    >
      <div className="mdx-roadmap__header">
        <Typography component="h2" variant="h6">
          {title}
        </Typography>

        {description && (
          <Typography component="p" variant="h4">
            {description}
          </Typography>
        )}
      </div>
      {timeline.length > 0 && (
        <Grid
          className="mdx-roadmap__timeline"
          xs={{ cols: 6, wrap: false, gap: '0 1rem' }}
        >
          {timeline.map((item, index) => (
            <Grid.Item key={index} xs={1}>
              <TimelineItem
                {...item}
                index={item.index ?? index + 1}
                period={item.period}
                description={item.description}
                alignment={alignment}
                borderStyle={item.borderStyle}
                className={clsx('mdx-roadmap__timeline-item', item.className)}
              />
            </Grid.Item>
          ))}
        </Grid>
      )}
    </div>
  )
}
