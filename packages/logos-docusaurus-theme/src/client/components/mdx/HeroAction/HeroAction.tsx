import { Button, ButtonProps, Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import './HeroAction.scss'

export type HeroActionProps = React.HTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonProps['variant']
  size?: 'medium' | 'large'
}

export const HeroAction: React.FC<HeroActionProps> = ({
  size = 'large',
  variant = 'outlined',
  className,
  children,
  ...props
}) => {
  return (
    <a
      className={clsx(className, 'mdx-hero-action', `mdx-hero-action--${size}`)}
      {...props}
    >
      <Button variant={variant} size={size}>
        <Typography variant="label1" style={{ color: 'inherit' }}>
          {children}
        </Typography>
      </Button>
    </a>
  )
}
