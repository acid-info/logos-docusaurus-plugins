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
  timeline?: Partial<TimelineItemProps>[]
}

export const Roadmap: React.FC<RoadmapProps> = ({
  title,
  description,
  timeline = [],
  className,
  children,
  ...props
}) => {
  const currentYear = new Date().getFullYear()

  const handleBorderStyle = (item, index, array) => {
    if (index === array.length - 1) {
      return 'none'
    }

    const currentYear = item.period[0]
    const nextYear = array[index + 1].period[0]

    if (currentYear === nextYear) {
      return 'solid'
    }

    return 'dashed'
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
    <div className={clsx(className, 'mdx-roadmap')} {...props}>
      <div className="mdx-roadmap__header">
        <Typography component="h2" variant="h5">
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
          spacingButtons={true}
          leftLabel="Past"
          rightLabel="Future"
        >
          {timeline.map((item, index) => (
            <Grid.Item key={index} xs={1}>
              <TimelineItem
                {...item}
                index={index}
                period={item.period ?? currentYear}
                description={item.description}
                borderStyle={handleBorderStyle(item, index, timeline)}
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
