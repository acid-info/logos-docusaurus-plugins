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
  const currentYear = new Date().getFullYear()

  const handleBorderStyle = (year: number, isLast: boolean) => {
    if (year === currentYear) {
      return 'solid'
    } else if (isLast) {
      return 'none'
    } else return 'dashed'
  }

  const getCurrentQuarter = () => {
    const month = new Date().getMonth()
    return 'Q' + Math.ceil((month + 1) / 3)
  }

  const handlePeriodStyle = (period: TimelineItemProps['period']) => {
    const currentYear = new Date().getFullYear()
    const currentQuarter = getCurrentQuarter()

    let year, additional

    if (Array.isArray(period)) {
      ;[year, additional] = period
    } else {
      year = period
    }

    if (year < currentYear) {
      return 'filled'
    } else if (year > currentYear) {
      return 'transparent'
    } else {
      if (!additional || additional === '+') {
        return 'filled'
      }
      if (additional <= currentQuarter) {
        return 'filled'
      }
      return 'transparent'
    }
  }

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
          xs={{ cols: 6, wrap: false, gap: '0 1rem', scrollButtons: true }}
          spacingButtons
          leftLabel="Past"
          rightLabel="Future"
        >
          {timeline.map((item, index) => (
            <Grid.Item key={index} xs={1}>
              <TimelineItem
                {...item}
                index={item.index ?? index + 1}
                period={item.period ?? currentYear}
                description={item.description}
                alignment={alignment}
                borderStyle={handleBorderStyle(
                  item?.period?.[0] ?? currentYear,
                  index === timeline.length - 1,
                )}
                periodStyle={handlePeriodStyle(item?.period ?? currentYear)}
                className={clsx('mdx-roadmap__timeline-item', item.className)}
              />
            </Grid.Item>
          ))}
        </Grid>
      )}
    </div>
  )
}
