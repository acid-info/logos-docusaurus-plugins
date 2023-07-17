import { Button, ButtonProps, Typography } from '@acid-info/lsd-react'
import Link, { Props } from '@docusaurus/Link'
import clsx from 'clsx'
import React from 'react'
import './HeroAction.scss'

export type HeroActionProps = Props & {
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
    <Link
      className={clsx(className, 'mdx-hero-action', `mdx-hero-action--${size}`)}
      {...props}
    >
      <Button variant={variant} size={size}>
        <Typography
          component="span"
          variant="label1"
          style={{ color: 'inherit' }}
        >
          {children}
        </Typography>
      </Button>
    </Link>
  )
}
