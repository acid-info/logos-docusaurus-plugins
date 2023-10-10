import { Button, Typography } from '@acid-info/lsd-react'
import Link from '@docusaurus/Link'
import React from 'react'
import { IconAvatar, IconDiscordWhite, IconGithub } from '../../Icon'
import './ProfileCard.scss'
import clsx from 'clsx'

export type ProfileCardProps = React.HTMLProps<HTMLDivElement> & {
  imgSrc?: string
  name?: string
  githubUsername?: string
  githubLink?: string
  discordUsername?: string
  discordLink?: string
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  imgSrc,
  name,
  githubUsername,
  githubLink,
  discordUsername,
  discordLink,
  ...props
}) => {
  return (
    <div {...props} className={clsx('mdx-profile-card', props.className)}>
      <div className="mdx-profile-card__profile">
        {typeof imgSrc === 'undefined' ? (
          <IconAvatar className="mdx-profile-card__avatar" />
        ) : (
          <img
            alt={typeof name === 'string' ? name : ''}
            className="mdx-profile-card__avatar"
            src={imgSrc}
          />
        )}
        <Typography
          className="mdx-profile-card__name"
          variant="h4"
          component="h4"
        >
          {name}
        </Typography>
      </div>

      <div className="mdx-profile-card__buttons">
        {githubUsername && githubLink && (
          <Link
            href={githubLink}
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
                {githubUsername}
              </Typography>
            </Button>
          </Link>
        )}

        {discordUsername && discordLink && (
          <Link
            href={discordLink}
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
                {discordUsername}
              </Typography>
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
