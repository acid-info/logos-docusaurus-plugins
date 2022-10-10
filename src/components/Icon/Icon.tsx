import React from 'react'
import { useColorMode } from '@docusaurus/theme-common'
import { clsx } from 'clsx'

import styles from './style.module.scss'

import DotSvg from '@site/static/icons/dot.svg'
import ArrowRCircleSvg from '@site/static/icons/arrow-right-circle.svg'
import ArrowLCircleSvg from '@site/static/icons/arrow-left-circle.svg'
import GithubSvg from '@site/static/icons/github.svg'
import FolderSvg from '@site/static/icons/folder.svg'
import TwitterSvg from '@site/static/icons/twitter.svg'
import DiscordSvg from '@site/static/icons/discord.svg'
import LinkedinSvg from '@site/static/icons/linkedin.svg'
import DiscourseSvg from '@site/static/icons/discourse.svg'
import TelegramSvg from '@site/static/icons/telegram.svg'
import StatusSvg from '@site/static/icons/status.svg'
import SearchSvg from '@site/static/icons/search.svg'
import DropdownSvg from '@site/static/icons/dropdown.svg'
import GScholarSvg from '@site/static/icons/gscholar.svg'

type TIconProps = {
  size?: 's' | 'm' | 'l'
}

type TProps = {
  children?: JSX.Element
  fill?: string
} & TIconProps

export const Icon = (props: TProps): JSX.Element => {
  const { children, size = 'm' } = props
  const { colorMode, setColorMode } = useColorMode()

  return (
    <div
      className={clsx(
        styles.icon,
        colorMode === 'dark' ? styles.dark : styles.light,
        styles[size],
      )}
    >
      {children}
    </div>
  )
}

export const IconArrowRightCircle = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <ArrowRCircleSvg />
  </Icon>
)

export const IconArrowLeftCircle = (props: TIconProps): JSX.Element => (
  <Icon>
    <ArrowLCircleSvg />
  </Icon>
)

export const IconFolder = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <FolderSvg />
  </Icon>
)

export const IconGithub = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <GithubSvg />
  </Icon>
)

export const IconDiscord = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <DiscordSvg />
  </Icon>
)

export const IconStatus = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <StatusSvg />
  </Icon>
)

export const IconTwitter = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <TwitterSvg />
  </Icon>
)

export const IconTelegram = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <TelegramSvg />
  </Icon>
)

export const IconDiscourse = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <DiscourseSvg />
  </Icon>
)

export const IconLinkedin = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <LinkedinSvg />
  </Icon>
)

export const IconDot = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <DotSvg />
  </Icon>
)

export const IconFolderFilled = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <FolderSvg />
  </Icon>
)

export const IconSearch = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <SearchSvg />
  </Icon>
)

export const IconDropdown = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <DropdownSvg />

  </Icon>
)

export const IconGScholar = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <GScholarSvg />
  </Icon>
)
