import { Typography, TypographyProps } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import { useHero } from '../Hero/Hero.context'
import './HeroTitle.scss'

export type HeroTitleProps = TypographyProps & {
  size?: 'medium' | 'large'
  uppercase?: boolean
}

export const HeroTitle: React.FC<HeroTitleProps> = ({
  size: sizeProp,
  uppercase: uppercaseProp,
  className,
  children,
  ...props
}) => {
  const ctx = useHero()

  const size = sizeProp ? sizeProp : ctx ? ctx.size : 'medium'

  const uppercase =
    typeof uppercaseProp !== 'undefined' ? uppercaseProp : ctx?.size === 'large'

  return (
    <Typography
      variant="h1"
      component="h1"
      className={clsx(
        className,
        'mdx-hero-title',
        `mdx-hero-title--${size}`,
        uppercase && 'mdx-hero-title--uppercase',
      )}
      {...(props as any)}
    >
      {children}
    </Typography>
  )
}
