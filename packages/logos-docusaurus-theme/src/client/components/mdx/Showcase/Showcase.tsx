import { Typography } from '@acid-info/lsd-react'
import ThemedImage from '@theme/ThemedImage'
import clsx from 'clsx'
import React from 'react'
import './Showcase.scss'

export type ShowcaseItem = {
  name: React.ReactNode
  logo?: string
  logoDark?: string
  description: React.ReactNode
}

export type ShowcaseProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  items: ShowcaseItem[]
}

export const Showcase: React.FC<ShowcaseProps> = ({
  items = [],
  className,
  children,
  ...props
}) => {
  return (
    <div className={clsx(className, 'mdx-showcase')} {...props}>
      {items.map((item, index) => {
        return (
          <div key={index} className="mdx-showcase__item">
            <div key={index} className="mdx-showcase__item-inner">
              {item?.logo && item?.logoDark && (
                <ThemedImage
                  sources={{
                    dark: item.logoDark,
                    light: item.logo,
                  }}
                  alt={typeof item.name === 'string' ? item.name : 'image'}
                  className="mdx-showcase__item-logo"
                />
              )}
              <Typography
                variant="h3"
                component="h2"
                className="mdx-showcase__item-name"
              >
                {item.name}
              </Typography>
              <Typography
                variant="subtitle1"
                component="p"
                className="mdx-showcase__item-description"
              >
                {item.description}
              </Typography>
            </div>
          </div>
        )
      })}
    </div>
  )
}
