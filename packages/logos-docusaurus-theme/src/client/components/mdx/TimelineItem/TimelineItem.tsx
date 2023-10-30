import { Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import './TimelineItem.scss'

export type TimelineItemProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  /** The index or label of the timeline item. */
  index: React.ReactNode
  /** The alignment of the timeline item, either 'top' or 'bottom'. (Optional, default: 'top') */
  alignment?: 'top' | 'bottom'
  /** The period or time frame associated with the timeline item. e.g., `2023 Q3` */
  period: React.ReactNode
  /** The description or content of the timeline item. */
  description: React.ReactNode
  /** The border style for the timeline item */
  borderStyle?: 'solid' | 'dashed' | 'none'
}

/**
 * A component for displaying roadmap items, such as events or milestones, in a timeline layout.
 *
 * @example
 * Roadmap example:
 * ```tsx
 * import {
 *  Box,
 *  Grid,
 *  TimelineItem,
 *  SectionHeader,
 *  CallToActionButton
 * } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
 *
 * <Box top={{ xs: 144, lg: 216 }}>
 *   <SectionHeader
 *     title="Roadmap"
 *     description="Roadmap description"
 *     bottom={{ xs: "4rem", lg: "7.25rem" }}
 *   />
 *   <Grid xs={{ cols: 6, wrap: false, gap: "0 1rem" }} actions={
 *     <CallToActionButton style={{ marginTop: 0 }} size="small" variant="outlined" href="/about">
 *         Read more
 *     </CallToActionButton>
 *   }>
 *     <Grid.Item>
 *       <TimelineItem
 *         index={0}
 *         period="2013"
 *         borderStyle="solid"
 *         description="First item"
 *       />
 *     </Grid.Item>
 *     Add more items here
 *     <Grid.Item>
 *       <TimelineItem
 *         index={10}
 *         period="2024+"
 *         borderStyle="none"
 *         description="Last item"
 *       />
 *     </Grid.Item>
 *   </Grid>
 * </Box>
 * ```
 */
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
