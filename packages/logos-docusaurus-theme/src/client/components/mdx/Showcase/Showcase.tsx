import { Typography } from '@acid-info/lsd-react'
import { useColorMode } from '@docusaurus/theme-common'
import clsx from 'clsx'
import React from 'react'
import './Showcase.scss'

export type ShowcaseItem = {
  name: React.ReactNode
  logo: string
  logoDark: string
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
  const { isDarkTheme } = useColorMode()

  return (
    <div className={clsx(className, 'mdx-showcase')} {...props}>
      {items.map((item, index) => {
        const logoSrc = item.logo ?? item.logoDark

        return (
          <div key={index} className="mdx-showcase__item">
            <div key={index} className="mdx-showcase__item-inner">
              <img
                src={(isDarkTheme ? item.logoDark : item.logo) ?? logoSrc}
                alt={typeof item.name === 'string' ? item.name : 'image'}
                className="mdx-showcase__item-logo"
              />
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
