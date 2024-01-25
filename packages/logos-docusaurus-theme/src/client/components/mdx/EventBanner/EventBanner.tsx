import ThemedImage from '@theme/ThemedImage'
import React from 'react'
import './EventBanner.scss'

export type EventBannerProps = React.HTMLProps<HTMLAnchorElement> & {
  src: string
}

export const EventBanner: React.FC<EventBannerProps> = ({ src }) => {
  return (
    <ThemedImage
      sources={{
        dark: src,
        light: src,
      }}
      alt={'event thumbnail'}
      className="mdx-event-banner__thumbnail"
    />
  )
}
