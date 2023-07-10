import {
  IconButton,
  IconButtonGroup,
  NavigateBeforeIcon,
  NavigateNextIcon,
  Typography,
} from '@acid-info/lsd-react'
import clsx from 'clsx'
import React, { useRef } from 'react'
import './Roadmap.scss'

export type TimelineItem = {
  period: string
  description: string
  borderStyle?: 'solid' | 'dashed'
}

export type RoadmapProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  title: React.ReactNode
  description?: React.ReactNode
  timeline?: TimelineItem[]
}

export const Roadmap: React.FC<RoadmapProps> = ({
  title,
  description,
  timeline = [],
  className,
  children,
  ...props
}) => {
  const timelineRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: -1 | 1) => {
    const el = timelineRef.current
    if (!el) return

    const itemWidth = el.children[0]?.getBoundingClientRect?.()?.width ?? 236
    el.scrollTo({
      behavior: 'smooth',
      left:
        el.scrollLeft +
        (el.getBoundingClientRect()?.width - itemWidth) * direction,
    })
  }

  return (
    <div className={clsx(className, 'mdx-roadmap')} {...props}>
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
      <div className="mdx-roadmap__actions">
        {children && <div className="mdx-roadmap__cta">{children}</div>}
        <div className="mdx-roadmap__scroll">
          <IconButtonGroup size="small" color="primary">
            <IconButton size="small" onClick={scroll.bind(null, -1)}>
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton size="small" onClick={scroll.bind(null, 1)}>
              <NavigateNextIcon />
            </IconButton>
          </IconButtonGroup>
        </div>
      </div>
      {timeline.length > 0 && (
        <div
          ref={timelineRef}
          className="mdx-roadmap__timeline hidden-scrollbar"
        >
          {timeline.map((item, index) => (
            <div key={index} className="mdx-roadmap__timeline-item">
              <div className="mdx-roadmap__timeline-header">
                <div className="mdx-roadmap__timeline-period-container">
                  <div
                    className={clsx(
                      'mdx-roadmap__timeline-border',
                      item.borderStyle === 'dashed' &&
                        'mdx-roadmap__timeline-border--dashed',
                    )}
                  />
                  <Typography
                    variant="subtitle1"
                    component="span"
                    className="mdx-roadmap__timeline-period"
                  >
                    {item.period}
                  </Typography>
                </div>
                <Typography
                  variant="h3"
                  component="span"
                  className="mdx-roadmap__timeline-index"
                >
                  {`${index < 9 ? '0' : ''}${index + 1}`}
                </Typography>
              </div>
              <Typography
                variant="h6"
                component="p"
                className="mdx-roadmap__timeline-description"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
