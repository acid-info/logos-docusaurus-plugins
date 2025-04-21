import LinkBase from '@docusaurus/Link'
import React, { HTMLProps } from 'react'
import { Button } from './Button'

const Link = LinkBase as unknown as React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>

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
