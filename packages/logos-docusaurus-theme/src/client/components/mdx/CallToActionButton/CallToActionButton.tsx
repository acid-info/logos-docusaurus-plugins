import { Button, ButtonProps, Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import './CallToActionButton.scss'

export type CallToActionButtonProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  href?: string
  size?: ButtonProps['size']
  variant?: ButtonProps['variant']
}

export const CallToActionButton: React.FC<CallToActionButtonProps> = ({
  href,
  className,
  variant = 'filled',
  size = 'large',
  children,
  ...props
}) => {
  return (
    <Typography
      className={clsx('mdx-cta-button', className)}
      variant="body1"
      component="a"
      href={href}
      target="_blank"
    >
      <Button size={size} variant={variant}>
        {children}
      </Button>
    </Typography>
  )
}
