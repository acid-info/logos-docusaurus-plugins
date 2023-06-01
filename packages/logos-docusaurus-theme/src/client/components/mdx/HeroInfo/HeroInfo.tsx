import clsx from 'clsx'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { useHero } from '../Hero/Hero.context'
import './HeroInfo.scss'
import { useScrollY } from '../../../lib/useScrollY'
import { calcScrollThreshold, mapFloat } from '../../../lib/ui.utils'

export type HeroInfoProps = PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
> & {
  size?: 'medium' | 'large' | 'small'
}

const calcMaxOffsetY = () => {
  return window.innerHeight * 0.1
}
export const HeroInfo: React.FC<HeroInfoProps> = ({
  size: sizeProp,
  className,
  children,
  ...props
}) => {
  const ctx = useHero()
  const size = sizeProp ? sizeProp : ctx ? ctx.size : 'medium'
  const scrollY = useScrollY()
  const ref = useRef<HTMLDivElement>()
  const [initialMarginBottom, setInitialMarginBottom] = useState<number | null>(
    null,
  )

  const getMarginBottom = () => {
    const offsetY = mapFloat(
      scrollY,
      0,
      calcScrollThreshold(),
      0,
      calcMaxOffsetY(),
    )
    return initialMarginBottom ? initialMarginBottom - offsetY : 0
  }

  useEffect(() => {
    if (typeof window === 'undefined' || !(ref && ref.current)) return
    setInitialMarginBottom(
      parseFloat(window.getComputedStyle(ref.current).marginBottom),
    )
  }, [])

  return (
    <div
      className={clsx(className, 'mdx-hero-info', `mdx-hero-info--${size}`)}
      style={{
        ...(initialMarginBottom ? { marginBottom: getMarginBottom() } : {}),
      }}
      ref={ref}
      {...(props as any)}
    >
      {children}
    </div>
  )
}
