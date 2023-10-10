import { Button, PickIcon, Typography } from '@acid-info/lsd-react'
import ThemedImage from '@theme/ThemedImage'
import clsx from 'clsx'
import React from 'react'
import './AppCard.scss'

export type AppCardProps = React.HTMLProps<HTMLDivElement> & {
  logoSrc?: string
  logoSrcDark?: string
  name?: React.ReactNode
  description?: React.ReactNode
  link?: string
  linkLabel?: string
}

export const AppCard: React.FC<AppCardProps> = ({
  logoSrc,
  logoSrcDark,
  name,
  description,
  link,
  linkLabel,
  ...props
}) => {
  return (
    <div {...props} className={clsx(props.className, 'mdx-app-card')}>
      {(logoSrc || logoSrcDark) && (
        <ThemedImage
          sources={{
            dark: logoSrcDark ?? logoSrc ?? '',
            light: logoSrc ?? logoSrcDark ?? '',
          }}
          alt={typeof name === 'string' ? name : ''}
          className="mdx-app-card__logo"
        />
      )}
      <Typography component="span" variant="h5" className="mdx-app-card__name">
        {name}
      </Typography>
      <Typography variant="subtitle1" className="mdx-app-card__description">
        {description}
      </Typography>
      {link && (
        <a href={link} target="_blank" className="mdx-app-card__link">
          <Button size="large" variant="outlined">
            <Typography variant="label1" component="span">
              {linkLabel ?? <>Visit {name}</>}
            </Typography>
            <span>
              <PickIcon color="primary" />
            </span>
          </Button>
        </a>
      )}
    </div>
  )
}
