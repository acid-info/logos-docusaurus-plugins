import { useColorMode } from '@docusaurus/theme-common'
import { clsx } from 'clsx'
import React, { HTMLProps, SVGProps } from 'react'
import styles from './style.module.scss'

type TProps = {
  children: JSX.Element
}

type TSvgProps = {
  fill?: string
}

export const Icon = (props: TProps): JSX.Element => {
  const { children } = props
  const { colorMode, setColorMode } = useColorMode()

  return (
    <div
      className={clsx(
        styles.icon,
        colorMode === 'dark' ? styles.dark : styles.light,
      )}
    >
      {children}
    </div>
  )
}

export const IconArrowRightCircle = ({
  fill = 'black',
}: TSvgProps): JSX.Element => (
  <Icon>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" rx="10" fill={'black'} />
      <path
        d="M9 8L11 10L9 12"
        stroke="white"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </Icon>
)

export const IconArrowLeftCircle = ({
  fill = 'black',
}: TSvgProps): JSX.Element => (
  <Icon>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" rx="10" fill="black" />
      <path
        d="M11 12L9 10L11 8"
        stroke="white"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </Icon>
)

export const IconFolder = ({ fill = 'black' }: TSvgProps): JSX.Element => (
  <Icon>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" rx="10" fill="black" />
      <path
        d="M11 12L9 10L11 8"
        stroke="white"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </Icon>
)

export const IconGithub = ({ fill = 'black' }: TSvgProps): JSX.Element => (
  <Icon>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" rx="10" fill="black" />
      <path
        d="M11 12L9 10L11 8"
        stroke="white"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </Icon>
)

export const IconDiscord = ({ fill = 'black' }: TSvgProps): JSX.Element => (
  <Icon>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" rx="10" fill="black" />
      <path
        d="M11 12L9 10L11 8"
        stroke="white"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </Icon>
)

export const IconStatus = ({ fill = 'black' }: TSvgProps): JSX.Element => (
  <Icon>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" rx="10" fill="black" />
      <path
        d="M11 12L9 10L11 8"
        stroke="white"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </Icon>
)

export const IconTwitter = ({ fill = 'black' }: TSvgProps): JSX.Element => (
  <Icon>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" rx="10" fill="black" />
      <path
        d="M11 12L9 10L11 8"
        stroke="white"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </Icon>
)

export const IconTelegram = ({ fill = 'black' }: TSvgProps): JSX.Element => (
  <Icon>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" rx="10" fill="black" />
      <path
        d="M11 12L9 10L11 8"
        stroke="white"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </Icon>
)

export const IconDiscourse = ({ fill = 'black' }: TSvgProps): JSX.Element => (
  <Icon>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" rx="10" fill="black" />
      <path
        d="M11 12L9 10L11 8"
        stroke="white"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </Icon>
)
