import { Typography } from '@acid-info/lsd-react'
import ThemedImage from '@theme/ThemedImage'
import clsx from 'clsx'
import React from 'react'
import './EventCard.scss'

export type EventCardProps = React.HTMLProps<HTMLAnchorElement> & {
  thumbnail: string
  title: string
  date: React.ReactNode
  location: string
}

export const EventCard: React.FC<EventCardProps> = ({
  thumbnail,
  title,
  date,
  location,
  ...props
}) => {
  return (
    <a
      target="_self"
      {...props}
      className={clsx(props.className, 'mdx-event-card')}
    >
      <ThemedImage
        sources={{
          dark: thumbnail,
          light: thumbnail,
        }}
        alt={title ?? 'event thumbnail'}
        className="mdx-event-card__thumbnail"
      />
      <Typography
        component="h5"
        variant="subtitle1"
        className="mdx-event-card__title"
      >
        {title}
      </Typography>
      <div className="mdx-event-card__row">
        <div className="mdx-event-card__info">
          <Typography className="mdx-event-card__label" variant="body3">
            Date
          </Typography>
          <Typography variant="body3">{date}</Typography>
        </div>
        <div className="mdx-event-card__info">
          <Typography className="mdx-event-card__label" variant="body3">
            Location
          </Typography>
          <Typography variant="body3">{location}</Typography>
        </div>
      </div>
    </a>
  )
}
