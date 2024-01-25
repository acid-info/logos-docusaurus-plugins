import { Typography } from '@acid-info/lsd-react'
import ThemedImage from '@theme/ThemedImage'
import clsx from 'clsx'
import React from 'react'
import './EventProfile.scss'
import { IconEmail, IconLinkedin } from '@logos-theme/components/Icon'

export type EventProfileProps = {
  image: string
  name: string
  role: React.ReactNode
  email?: string
  linkedin?: string
}

export const EventProfile: React.FC<EventProfileProps> = ({
  image,
  name,
  role,
  email,
  linkedin,
  ...props
}) => {
  return (
    <div {...props} className={'mdx-event-profile'}>
      <ThemedImage
        sources={{
          dark: image,
          light: image,
        }}
        alt={image ?? 'event profile'}
        className="mdx-event-profile__image"
      />
      <div className="mdx-event-profile__info">
        <Typography
          component="p"
          variant="subtitle1"
          className="mdx-event-profile__title"
        >
          {name}
        </Typography>
        <Typography variant="body2" className="mdx-event-profile__role">
          {role}
        </Typography>
        <div className="mdx-event-profile__social">
          {email && (
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconEmail />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <IconLinkedin />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
