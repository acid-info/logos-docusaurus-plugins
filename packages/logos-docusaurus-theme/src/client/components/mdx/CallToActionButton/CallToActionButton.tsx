import {
  Button,
  ButtonProps,
  Typography,
  TypographyProps,
} from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import './CallToActionButton.scss'

export type CallToActionButtonProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'title'
> & {
  href?: string
  size?: ButtonProps['size']
  variant?: ButtonProps['variant']
}

const LinkElement = Typography as React.FC<TypographyProps & { component: 'a' }>

export const CallToActionButton: React.FC<CallToActionButtonProps> = ({
  href,
  className,
  variant = 'filled',
  size = 'large',
  children,
  ...props
}) => {
  return (
    <LinkElement
      className={clsx('mdx-cta-button', className)}
      variant="body1"
      component="a"
      href={href}
      target={'_blank'}
      {...(props as any)}
    >
      <Button size={size} variant={variant}>
        {children}
      </Button>
    </LinkElement>
  )
}
