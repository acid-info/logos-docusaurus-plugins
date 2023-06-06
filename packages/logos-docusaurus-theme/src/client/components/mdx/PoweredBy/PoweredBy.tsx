import { Button, PickIcon, Typography } from '@acid-info/lsd-react'
import { useColorMode } from '@docusaurus/theme-common'
import React from 'react'
import './PoweredBy.scss'

export type PoweredByItem = {
  logoSrc?: string
  logoSrcDark?: string
  name?: React.ReactNode
  description?: React.ReactNode
  link?: string
  linkLabel?: string
}

export type PoweredByProps = React.HTMLProps<HTMLDivElement> & {
  items?: PoweredByItem[]
}

export const PoweredBy: React.FC<PoweredByProps> = ({
  items = [],
  ...props
}) => {
  const { colorMode } = useColorMode()

  return (
    <div className="mdx-powered-by">
      {items.map((item, index) => {
        const logoSrc = item.logoSrc ?? item.logoSrcDark

        return (
          <div key={index} className="mdx-powered-by__card">
            {logoSrc && (
              <img
                alt={typeof item.name === 'string' ? item.name : ''}
                className="mdx-powered-by__logo"
                src={
                  (colorMode === 'dark' ? item.logoSrcDark : item.logoSrc) ??
                  logoSrc
                }
              />
            )}
            <Typography
              component="span"
              variant="h5"
              className="mdx-powered-by__name"
            >
              {item.name}
            </Typography>
            <Typography
              variant="subtitle1"
              className="mdx-powered-by__description"
            >
              {item.description}
            </Typography>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                className="mdx-powered-by__link"
              >
                <Button size="large" variant="outlined">
                  <Typography variant="label1" component="span">
                    {item.linkLabel ?? <>Visit {item.name}</>}
                  </Typography>
                  <span>
                    <PickIcon color="primary" />
                  </span>
                </Button>
              </a>
            )}
          </div>
        )
      })}
    </div>
  )
}
