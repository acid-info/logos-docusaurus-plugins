import { Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import './TimelineItem.scss'

export type TimelineItemProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  index: React.ReactNode
  alignment?: 'top' | 'bottom'
  period: React.ReactNode
  description: React.ReactNode
  borderStyle?: 'solid' | 'dashed' | 'none'
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  index,
  period,
  description,
  alignment = 'top',
  borderStyle,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={clsx(
        className,
        'mdx-timeline-item',
        `mdx-timeline-item--${alignment}-aligned`,
        borderStyle === 'dashed' && 'mdx-timeline-item--border-dashed',
      )}
      {...props}
    >
      <div className="mdx-timeline-item__header">
        <div className="mdx-timeline-item__period-container">
          {borderStyle !== 'none' && (
            <div className={clsx('mdx-timeline-item__border')} />
          )}
          <Typography
            variant="subtitle1"
            component="span"
            className="mdx-timeline-item__period"
          >
            {period}
          </Typography>
        </div>
        <Typography
          variant="h3"
          component="span"
          className="mdx-timeline-item__index"
        >
          {typeof index === 'number'
            ? `${index < 9 ? '0' : ''}${index + 1}`
            : index}
        </Typography>
      </div>
      <Typography
        variant="h6"
        component="p"
        className="mdx-timeline-item__description"
      >
        {description}
      </Typography>
    </div>
  )
}
