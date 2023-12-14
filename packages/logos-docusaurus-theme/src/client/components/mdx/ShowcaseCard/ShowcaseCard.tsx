import { Typography } from '@acid-info/lsd-react'
import ThemedImage from '@theme/ThemedImage'
import clsx from 'clsx'
import React from 'react'
import './ShowcaseCard.scss'

export type ShowcaseCardProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  index?: React.ReactNode
  logoSrc?: string
  logoSrcDark?: string
  name: React.ReactNode
  description: React.ReactNode
  size?: 'small' | 'large'
  borderStyle?: 'none' | 'solid'
}

export const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  index,
  name,
  logoSrc,
  logoSrcDark,
  description,
  className,
  size = 'large',
  borderStyle = 'solid',
  children,
  ...props
}) => {
  return (
    <div
      className={clsx(
        className,
        'mdx-showcase-card',
        `mdx-showcase-card--${size}`,
        `mdx-showcase-card--border-${borderStyle}`,
      )}
      {...props}
    >
      <div className="mdx-showcase-card__inner">
        {index && (
          <Typography
            className="mdx-showcase-card__index"
            variant="subtitle2"
            component="div"
          >
            {index}
          </Typography>
        )}
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
        {name && (
          <Typography
            variant="h2"
            component="h2"
            className="mdx-showcase-card__name"
          >
            {name}
          </Typography>
        )}
        {description && (
          <Typography
            variant="body1"
            component="p"
            className="mdx-showcase-card__description"
          >
            {description}
          </Typography>
        )}
      </div>
    </div>
  )
}
