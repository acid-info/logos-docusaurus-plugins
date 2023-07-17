import { Button, ButtonProps, Typography } from '@acid-info/lsd-react'
import Link, { Props } from '@docusaurus/Link'
import clsx from 'clsx'
import React from 'react'
import './CallToActionButton.scss'

export type CallToActionButtonProps = Props & {
  href?: string
  size?: ButtonProps['size']
  variant?: ButtonProps['variant']
}

export const CallToActionButton: React.FC<CallToActionButtonProps> = ({
  className,
  variant = 'filled',
  size = 'large',
  children,
  ...props
}) => {
  return (
    <Link className={clsx('mdx-cta-button', className)} {...(props as any)}>
      <Typography
        component="span"
        variant={size === 'large' ? 'label1' : 'label2'}
      >
        <Button size={size} variant={variant}>
          {children}
        </Button>
      </Typography>
    </Link>
  )
}
