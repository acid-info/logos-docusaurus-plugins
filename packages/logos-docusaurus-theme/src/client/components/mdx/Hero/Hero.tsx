import clsx from 'clsx'
import React from 'react'
import { HeroDescription, HeroTitle } from '../index'
import { HeroContext } from './Hero.context'
import './Hero.scss'

export type HeroProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  size?: 'large' | 'medium' | 'small'
  title?: React.ReactNode
  description?: React.ReactNode
}

export const Hero: React.FC<HeroProps> = ({
  size = 'medium',
  title,
  description,
  className,
  children,
  ...props
}) => {
  return (
    <HeroContext.Provider value={{ size }}>
      <div
        className={clsx(className, 'mdx-hero', `mdx-hero--${size}`)}
        {...props}
      >
        {title && <HeroTitle>{title}</HeroTitle>}
        {description && <HeroDescription>{description}</HeroDescription>}
        {children}
      </div>
    </HeroContext.Provider>
  )
}
