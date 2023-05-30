import { Typography, TypographyProps } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import './HeroActions.scss'

export type HeroActionsProps = React.HTMLAttributes<HTMLDivElement> & {}

export const HeroActions: React.FC<HeroActionsProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={clsx(className, 'mdx-hero-actions')} {...props}>
      {children}
    </div>
  )
}
