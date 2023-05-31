import { useColorMode } from '@docusaurus/theme-common'
import { clsx } from 'clsx'
import React from 'react'

import styles from './style.module.scss'

import ArrowLCircleSvg from '../../static/icons/arrow-left-circle.svg'
import ArrowL from '../../static/icons/arrow-left.svg'
import ArrowRCircleSvg from '../../static/icons/arrow-right-circle.svg'
import ArrowR from '../../static/icons/arrow-right.svg'
import CloseSvg from '../../static/icons/close.svg'
import CopySvg from '../../static/icons/copy.svg'
import DiscordSvg from '../../static/icons/discord.svg'
import DiscourseSvg from '../../static/icons/discourse.svg'
import DotSvg from '../../static/icons/dot.svg'
import DropdownSvg from '../../static/icons/dropdown.svg'
import FolderSvg from '../../static/icons/folder.svg'
import GithubSvg from '../../static/icons/github.svg'
import GScholarSvg from '../../static/icons/gscholar.svg'
import HistorySvg from '../../static/icons/history.svg'
import LinkedinSvg from '../../static/icons/linkedin.svg'
import SearchSvg from '../../static/icons/search.svg'
import StatusSvg from '../../static/icons/status.svg'
import TelegramSvg from '../../static/icons/telegram.svg'
import TwitterSvg from '../../static/icons/twitter.svg'

type TIconProps = {
  size?: 's' | 'm' | 'l'
  className?: string
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
        props.className && props.className,
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

export const IconArrowRight = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <ArrowR />
  </Icon>
)

export const IconArrowLeft = (props: TIconProps): JSX.Element => (
  <Icon>
    <ArrowL />
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

export const IconCopy = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <CopySvg />
  </Icon>
)

export const IconHistory = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <HistorySvg />
  </Icon>
)

export const IconClose = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <CloseSvg />
  </Icon>
)
