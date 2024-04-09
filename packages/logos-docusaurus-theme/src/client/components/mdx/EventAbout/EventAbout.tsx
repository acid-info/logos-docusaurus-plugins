import React from 'react'
import './EventAbout.scss'
import { Typography } from '@acid-info/lsd-react'

export type EventAboutProps = React.HTMLProps<HTMLAnchorElement> & {
  content: string
}

export const EventAbout: React.FC<EventAboutProps> = ({ children }) => {
  return (
    <div className="mdx-event-about__container">
      <Typography variant="h2" component="p" className="mdx-event-about__title">
        About
      </Typography>
      <Typography variant="body1">{children}</Typography>
    </div>
  )
}
