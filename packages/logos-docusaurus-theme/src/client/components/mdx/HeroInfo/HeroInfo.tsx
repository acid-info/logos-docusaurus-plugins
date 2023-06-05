import clsx from 'clsx'
import React, { PropsWithChildren, useEffect } from 'react'
import { useHero } from '../Hero/Hero.context'
import { ScrollToBottom } from '../index'
import './HeroInfo.scss'
import { useScrollY } from '../../../lib/useScrollY'
import {
  calcHeroInfoMb,
  calcScrollThreshold,
  isMobile,
  mapFloat,
} from '../../../lib/ui.utils'

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
  const [mb, setMb] = React.useState(0)
  const scrollY = useScrollY()

  useEffect(() => {
    if (isMobile()) {
      setMb(calcHeroInfoMb(scrollY))
    }
  }, [scrollY])

  return (
    <>
      <div
        className={clsx(className, 'mdx-hero-info', `mdx-hero-info--${size}`)}
        style={{
          marginBottom: `calc(100vh - var(--logos-hero-info-height) - ${mb}px)`,
        }}
        {...(props as any)}
      >
        {children}
      </div>
      <ScrollToBottom />
    </>
  )
}
