import React from 'react'
import './EventCTA.scss'
import { Button, Typography } from '@acid-info/lsd-react'
import Link, { Props } from '@docusaurus/Link'
import { IconExternalLink } from '../../../components/Icon'

export type EventCTAProps = {
  title?: string
  label: string
  link: string
  linkProps: Props
}

export const EventCTA: React.FC<EventCTAProps & Props> = ({
  title,
  label,
  link,
  linkProps,
}) => {
  return (
    <div className="mdx-event-cta__container">
      {title && (
        <Typography
          variant="h2"
          component="h2"
          className="mdx-event-cta__title"
        >
          {title}
        </Typography>
      )}

      <Link to={link} {...linkProps}>
        <Button className="mdx-event-cta__button">
          <Typography variant="body1">{label}</Typography>
          <IconExternalLink />
        </Button>
      </Link>
    </div>
  )
}
