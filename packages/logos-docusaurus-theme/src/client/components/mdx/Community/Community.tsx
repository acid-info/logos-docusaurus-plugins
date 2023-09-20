import { Typography } from '@acid-info/lsd-react'
import { useColorMode } from '@docusaurus/theme-common'
import React from 'react'
import './Community.scss'
import {
  IconX,
  IconDiscordWhite,
  IconTelegramWhite,
  IconExternalLink,
} from '../../Icon' // '@logos-theme/components/Icon' doesn't work

export enum CommunityType {
  X = 'x',
  Discord = 'discord',
  Telegram = 'telegram',
  CUSTOM = 'custom',
}

export type CommunityItem = {
  logoSrc?: string
  logoSrcDark?: string
  link: string
  linkLabel: string
  type?: CommunityType
}

export type CommunityProps = React.HTMLProps<HTMLDivElement> & {
  items?: CommunityItem[]
}

export const Community: React.FC<CommunityProps> = ({
  items = [],
  ...props
}) => {
  const { colorMode } = useColorMode()

  const renderSocialIcon = (type: CommunityType) => {
    switch (type) {
      case CommunityType.X:
        return <IconX className="mdx-community__logo" />
      case CommunityType.Discord:
        return <IconDiscordWhite className="mdx-community__logo" />
      case CommunityType.Telegram:
        return <IconTelegramWhite className="mdx-community__logo" />
      default:
        return null
    }
  }

  return (
    <div className="mdx-community" {...props}>
      {items.map((item, index) => {
        const logoSrc = item.logoSrc ?? item.logoSrcDark
        return (
          <a href={item.link} className="mdx-community__link" target="_blank">
            <div key={index} className="mdx-community__card">
              <div className="mdx-community__row">
                {typeof item.type !== 'undefined' &&
                item.type !== CommunityType.CUSTOM ? (
                  renderSocialIcon(item.type as CommunityType)
                ) : (
                  <img
                    alt={
                      typeof item.linkLabel === 'string' ? item.linkLabel : ''
                    }
                    className="mdx-community__logo"
                    src={
                      (colorMode === 'dark'
                        ? item.logoSrcDark
                        : item.logoSrc) ?? logoSrc
                    }
                  />
                )}
                <IconExternalLink className="mdx-community__external-link" />
              </div>
              <Typography
                variant="body1"
                component="span"
                className="mdx-community__body1"
              >
                {item.linkLabel}
              </Typography>
            </div>
          </a>
        )
      })}
    </div>
  )
}
