import clsx from 'clsx'
import React, { PropsWithChildren } from 'react'
import { useHero } from '../Hero/Hero.context'
import { ScrollToBottom } from '../index'
import './HeroInfo.scss'

export type HeroInfoProps = PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
> & {
  size?: 'medium' | 'large' | 'small'
}

export const HeroInfo: React.FC<HeroInfoProps> = ({
  size: sizeProp,
  className,
  children,
  ...props
}) => {
  const ctx = useHero()
  const size = sizeProp ? sizeProp : ctx ? ctx.size : 'medium'

  return (
    <>
      <div
        className={clsx(className, 'mdx-hero-info', `mdx-hero-info--${size}`)}
        {...(props as any)}
      >
        {children}
      </div>
      <ScrollToBottom />
    </>
  )
}
