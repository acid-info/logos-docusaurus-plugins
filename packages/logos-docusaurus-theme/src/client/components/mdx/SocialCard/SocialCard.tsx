import { Typography } from '@acid-info/lsd-react'
import ThemedImage from '@theme/ThemedImage'
import clsx from 'clsx'
import React from 'react'
import { IconExternalLink } from '../../Icon'
import './SocialCard.scss'

export type SocialCardProps = React.HTMLProps<HTMLAnchorElement> & {
  logoSrc?: string
  logoSrcDark?: string
  description?: React.ReactNode
}

export const SocialCard: React.FC<SocialCardProps> = ({
  title,
  logoSrc,
  logoSrcDark,
  description,
  ...props
}) => {
  return (
    <a
      target="_blank"
      {...props}
      className={clsx(props.className, 'mdx-social-card')}
    >
      <div className="mdx-social-card__row">
        {(logoSrc || logoSrcDark) && (
          <ThemedImage
            sources={{
              dark: logoSrcDark ?? logoSrc ?? '',
              light: logoSrc ?? logoSrcDark ?? '',
            }}
            alt={title ?? 'social card logo'}
            className="mdx-social-card__logo"
          />
        )}
        <IconExternalLink className="mdx-social-card__external-link" />
      </div>
      <Typography
        variant="body1"
        component="span"
        className="mdx-social-card__description"
      >
        {description}
      </Typography>
    </a>
  )
}
