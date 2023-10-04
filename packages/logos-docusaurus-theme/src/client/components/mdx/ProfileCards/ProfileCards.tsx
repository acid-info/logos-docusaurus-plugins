import { Button, Typography } from '@acid-info/lsd-react'
import React from 'react'
import './ProfileCards.scss'
import { IconAvatar, IconDiscordWhite, IconGithub } from '../../Icon' // '@logos-theme/components/Icon' doesn't work
import Link from '@docusaurus/Link'

export type ProfileCardItem = {
  imgSrc?: string
  name?: string
  githubUsername?: string
  githubLink?: string
  discordUsername?: string
  discordLink?: string
}

export type ProfileCardsProps = React.HTMLProps<HTMLDivElement> & {
  items?: ProfileCardItem[]
}

export const ProfileCards: React.FC<ProfileCardsProps> = ({
  items = [],
  ...props
}) => {
  return (
    <div className="mdx-profile-cards hidden-scrollbar" {...props}>
      {items.map((item, index) => {
        return (
          <div key={index} className="mdx-profile-card__card">
            <div className="mdx-profile-card__profile">
              {typeof item.imgSrc === 'undefined' ? (
                <IconAvatar className="mdx-profile-card__avatar" />
              ) : (
                <img
                  alt={typeof item.name === 'string' ? item.name : ''}
                  className="mdx-profile-card__avatar"
                  src={item.imgSrc}
                />
              )}
              <Typography
                className="mdx-profile-card__name"
                variant="h4"
                component="h4"
              >
                {item.name}
              </Typography>
            </div>

            <div className="mdx-profile-card__buttons">
              {item?.githubUsername && item?.githubLink && (
                <Link
                  href={item.githubLink}
                  target="_blank"
                  className={'mdx-profile-card__link'}
                >
                  <Button
                    size={'small'}
                    variant={'outlined'}
                    className={'mdx-profile-card__button'}
                  >
                    <IconGithub />
                    <Typography
                      variant="body2"
                      className="mdx-profile-card__link__label"
                    >
                      {item?.githubUsername}
                    </Typography>
                  </Button>
                </Link>
              )}

              {item?.discordUsername && item?.discordLink && (
                <Link
                  href={item.discordLink}
                  target="_blank"
                  className={'mdx-profile-card__link'}
                >
                  <Button
                    size={'small'}
                    variant={'outlined'}
                    className={'mdx-profile-card__button'}
                  >
                    <IconDiscordWhite />
                    <Typography
                      variant="body2"
                      className="mdx-profile-card__link__label"
                    >
                      {item?.discordUsername}
                    </Typography>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
