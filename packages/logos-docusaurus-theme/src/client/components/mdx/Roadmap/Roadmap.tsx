import clsx from 'clsx'
import React from 'react'
import { CallToActionSection, Grid, SectionHeader } from '..'
import { TimelineItem, TimelineItemProps } from '../TimelineItem'
import './Roadmap.scss'

export type RoadmapProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  title: React.ReactNode
  description?: React.ReactNode
  timeline?: Partial<TimelineItemProps>[]
  noBorder?: boolean
}

export const Roadmap: React.FC<RoadmapProps> = ({
  title,
  description,
  timeline = [],
  noBorder = false,
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

    return 'solid'
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
      <CallToActionSection
        className="mdx-roadmap__header"
        title={title}
        description={description}
        columns={1}
        ctaPosition="top"
        border={false}
        align="left"
      >
        {children}
      </CallToActionSection>
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
                className={clsx(
                  'mdx-roadmap__timeline-item',
                  noBorder && 'mdx-roadmap__timeline-item--no-border',
                  item.className,
                )}
              />
            </Grid.Item>
          ))}
        </Grid>
      )}
    </div>
  )
}
