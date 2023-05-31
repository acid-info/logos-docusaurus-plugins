import clsx from 'clsx'
import React from 'react'
import { HeroContext } from './Hero.context'
import './Hero.scss'

export type HeroProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  size?: 'large' | 'medium' | 'small'
}

export const Hero: React.FC<HeroProps> = ({
  size = 'medium',
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
        {children}
      </div>
    </HeroContext.Provider>
  )
}
