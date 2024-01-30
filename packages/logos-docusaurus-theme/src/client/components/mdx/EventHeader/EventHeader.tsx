import React from 'react'
import './EventHeader.scss'
import { Typography } from '@acid-info/lsd-react'

export type EventHeaderProps = React.HTMLProps<HTMLAnchorElement> & {
  title: string
  description: string
}

export const EventHeader: React.FC<EventHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="mdx-event-header__container">
      <Typography
        variant="h1"
        component="h1"
        className="mdx-event-header__label"
      >
        {title}
      </Typography>
      <Typography variant="subtitle1" className="mdx-event-header__content">
        {description}
      </Typography>
    </div>
  )
}
