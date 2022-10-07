import React from 'react'
import {
  IconDiscord,
  IconDiscourse,
  IconTwitter,
  IconGithub,
  IconStatus,
  IconTelegram,
} from './Icon'

type TProps = {
  handler: string
  provider:
    | 'discord'
    | 'twitter'
    | 'linkedin'
    | 'status'
    | 'github'
    | 'discourse'
    | 'telegram'
}

export const SocialMediaItem = (props: TProps): JSX.Element => {
  switch (props.provider) {
    case 'twitter':
      return (
        <a href={`https://twitter.com/${props.handler}`} target={'_blank'}>
          <IconTwitter />
        </a>
      )
    case 'discord':
      return (
        <a href={`https://discord.gg/${props.handler}`} target={'_blank'}>
          <IconDiscord />
        </a>
      )
    case 'github':
      return (
        <a href={`https://github.com/${props.handler}`} target={'_blank'}>
          <IconGithub />
        </a>
      )
    case 'telegram':
      return (
        <a href={`https://t.me/${props.handler}`} target={'_blank'}>
          <IconTelegram />
        </a>
      )
    case 'status':
      return (
        <a href={`https://join.status.im/u/${props.handler}`} target={'_blank'}>
          <IconStatus />
        </a>
      )
    case 'discourse':
      return (
        <a
          href={
            props.handler.indexOf('http') > -1
              ? props.handler
              : `https://${props.handler}`
          }
          target={'_blank'}
        >
          <IconDiscourse />
        </a>
      )
    default:
      return null
  }
}
