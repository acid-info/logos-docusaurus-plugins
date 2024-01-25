import React from 'react'
import './EventInfo.scss'
import { Typography } from '@acid-info/lsd-react'

export type EventInfoProps = React.HTMLProps<HTMLAnchorElement> & {
  label: string
  content: string
}

export const EventInfo: React.FC<EventInfoProps> = ({ label, content }) => {
  return (
    <div className="mdx-event-info__container">
      <Typography variant="body2" className="mdx-event-info__label">
        {label}
      </Typography>
      <Typography variant="body1" className="mdx-event-info__content">
        {content}
      </Typography>
    </div>
  )
}
