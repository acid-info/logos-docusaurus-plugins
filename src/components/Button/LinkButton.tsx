import Link from '@docusaurus/Link'
import React, { HTMLProps } from 'react'
import { Button } from './Button'
import { ButtonWithIcon } from './ButtonWithIcon'
import styles from './style.module.scss'

type TProps = {
  children: React.ReactNode
  linkProps: HTMLProps<HTMLAnchorElement>
}

export const LinkButton = ({
  children,
  linkProps,
  ...rest
}: TProps & HTMLProps<HTMLButtonElement>): JSX.Element => {
  return (
    <Link {...linkProps}>
      <Button {...rest}>{children}</Button>
    </Link>
  )
}
