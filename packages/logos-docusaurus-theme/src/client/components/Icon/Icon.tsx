import { useColorMode } from '@docusaurus/theme-common'
import { clsx } from 'clsx'
import React from 'react'

import styles from './style.module.scss'

import AddSvg from '../../static/icons/add.svg'
import ArrowLCircleSvg from '../../static/icons/arrow-left-circle.svg'
import ArrowL from '../../static/icons/arrow-left.svg'
import ArrowRCircleSvg from '../../static/icons/arrow-right-circle.svg'
import ArrowR from '../../static/icons/arrow-right.svg'
import Avatar from '../../static/icons/avatar.svg'
import CloseSvg from '../../static/icons/close.svg'
import CopySvg from '../../static/icons/copy.svg'
import DiscordWhiteSvg from '../../static/icons/discord-white.svg'
import DiscordSvg from '../../static/icons/discord.svg'
import DiscourseSvg from '../../static/icons/discourse.svg'
import DotSvg from '../../static/icons/dot.svg'
import DownloadSvg from '../../static/icons/download.svg'
import DropdownSvg from '../../static/icons/dropdown.svg'
import EditSvg from '../../static/icons/edit.svg'
import ExternalLinkSvg from '../../static/icons/external-link.svg'
import FolderSvg from '../../static/icons/folder.svg'
import FullscreenExitSvg from '../../static/icons/fullscreen-exit.svg'
import FullscreenSvg from '../../static/icons/fullscreen.svg'
import GithubWhiteSvg from '../../static/icons/github-white.svg'
import GScholarSvg from '../../static/icons/gscholar.svg'
import HistorySvg from '../../static/icons/history.svg'
import LinkedinSvg from '../../static/icons/linkedin.svg'
import RemoveSvg from '../../static/icons/remove.svg'
import SearchSvg from '../../static/icons/search.svg'
import StatusSvg from '../../static/icons/status.svg'
import TelegramWhiteSvg from '../../static/icons/telegram-white.svg'
import TelegramSvg from '../../static/icons/telegram.svg'
import TwitterSvg from '../../static/icons/twitter.svg'
import XWhiteSvg from '../../static/icons/x-white.svg'
import EmailSvg from '../../static/icons/email.svg'
import PlaySvg from '../../static/icons/play.svg'

type TIconProps = {
  size?: 's' | 'm' | 'l'
  className?: string
}

type TProps = {
  children?: JSX.Element
  fill?: boolean
  stroke?: boolean
} & TIconProps

export const Icon = (props: TProps): JSX.Element => {
  const { children, size = 'm' } = props

  return (
    <div
      className={clsx(
        styles.icon,
        styles[size],
        props.stroke && styles.stroke,
        props.fill && styles.fill,
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
    <GithubWhiteSvg />
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

export const IconPlay = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <PlaySvg />
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

export const IconEdit = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <EditSvg />
  </Icon>
)

export const IconFullscreen = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <FullscreenSvg />
  </Icon>
)

export const IconFullscreenExit = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <FullscreenExitSvg />
  </Icon>
)

export const IconExternalLink = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <ExternalLinkSvg />
  </Icon>
)

export const IconDiscordWhite = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <DiscordWhiteSvg />
  </Icon>
)

export const IconTelegramWhite = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <TelegramWhiteSvg />
  </Icon>
)

export const IconX = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <XWhiteSvg />
  </Icon>
)

export const IconAvatar = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <Avatar />
  </Icon>
)

export const IconDownload = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <DownloadSvg />
  </Icon>
)

export const IconAdd = (props: TIconProps): JSX.Element => (
  <Icon {...props} stroke>
    <AddSvg />
  </Icon>
)

export const IconRemove = (props: TIconProps): JSX.Element => (
  <Icon {...props} stroke>
    <RemoveSvg />
  </Icon>
)

export const IconEmail = (props: TIconProps): JSX.Element => (
  <Icon {...props}>
    <EmailSvg />
  </Icon>
)
