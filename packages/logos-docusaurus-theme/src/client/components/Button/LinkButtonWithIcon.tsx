import Link from '@docusaurus/Link'
import React, { HTMLProps } from 'react'
import { Button } from './Button'
import { ButtonWithIcon } from './ButtonWithIcon'
import styles from './style.module.scss'

type TProps = {
  children: React.ReactNode
  linkProps: HTMLProps<HTMLAnchorElement>
  icon: JSX.Element
}

export const LinkButtonWithIcon = ({
  children,
  linkProps,
  icon,
  ...rest
}: TProps & HTMLProps<HTMLButtonElement>): JSX.Element => {
  return (
    <Link {...linkProps}>
      <ButtonWithIcon {...rest} icon={icon}>
        {children}
      </ButtonWithIcon>
    </Link>
  )
}
