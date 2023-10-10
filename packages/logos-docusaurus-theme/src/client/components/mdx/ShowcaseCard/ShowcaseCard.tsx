import { Typography } from '@acid-info/lsd-react'
import ThemedImage from '@theme/ThemedImage'
import clsx from 'clsx'
import React from 'react'
import './ShowcaseCard.scss'

export type ShowcaseCardProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  logoSrc?: string
  logoSrcDark?: string
  name: React.ReactNode
  description: React.ReactNode
}

export const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  name,
  logoSrc,
  logoSrcDark,
  description,
  className,
  children,
  ...props
}) => {
  return (
    <div className={clsx(className, 'mdx-showcase-card')} {...props}>
      <div className="mdx-showcase-card__inner">
        {(logoSrc || logoSrcDark) && (
          <ThemedImage
            sources={{
              dark: logoSrcDark ?? logoSrc ?? '',
              light: logoSrc ?? logoSrcDark ?? '',
            }}
            alt={typeof name === 'string' ? name : ''}
            className="mdx-showcase-card__logo"
          />
        )}
        <Typography
          variant="h3"
          component="h2"
          className="mdx-showcase-card__name"
        >
          {name}
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          className="mdx-showcase-card__description"
        >
          {description}
        </Typography>
      </div>
    </div>
  )
}
