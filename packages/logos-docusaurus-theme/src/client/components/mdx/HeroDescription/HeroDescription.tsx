import { Typography, TypographyProps } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import { useHero } from '../Hero/Hero.context'
import './HeroDescription.scss'

export type HeroDescriptionProps = TypographyProps & {
  size?: 'small' | 'medium' | 'large'
}

export const HeroDescription: React.FC<HeroDescriptionProps> = ({
  size: sizeProp,
  className,
  children,
  ...props
}) => {
  const ctx = useHero()

  const size = sizeProp ?? (ctx ? ctx.size : 'medium')

  return (
    <Typography
      variant={size === 'small' ? 'h5' : 'h1'}
      className={clsx(
        className,
        'mdx-hero-description',
        `mdx-hero-description--${size}`,
      )}
      {...props}
    >
      {children}
    </Typography>
  )
}
