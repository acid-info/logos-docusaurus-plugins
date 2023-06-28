import clsx from 'clsx'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { makeStyle } from '../../../lib/makeStyle'
import { settle } from '../../../lib/settle'
import { useHero } from '../Hero/Hero.context'
import './HeroVideo.scss'

export type HeroVideoStyle = {
  scale?: string
  offsetY?: string
}

export type HeroVideoProps = PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
> & {
  placeholderSrc: string
  desktop?: HeroVideoStyle
  mobile?: HeroVideoStyle
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  placeholderSrc,
  desktop,
  mobile,
  className,
  style = {},
  children,
  ...props
}) => {
  const ctx = useHero()
  const ref = useRef<HTMLVideoElement>(null)
  const [loading, setLoading] = useState(true)

  const play = async () => {
    const el = ref.current
    if (!el) return

    await settle(() => el.play())
  }

  const onCanPlay = async () => {
    loading && setLoading(false)
    await play()
  }

  const onEnded = async () => {
    await play()
  }

  return (
    <>
      <div
        className={clsx(
          className,
          'mdx-hero-video',
          loading && 'mdx-hero-video--loading',
        )}
        style={makeStyle(
          { ...style },
          {
            'hero-video-scale': desktop?.scale ?? '58%',
            'hero-video-offset-y': desktop?.offsetY ?? '-10%',
            'hero-video-scale-mobile': mobile?.scale ?? '117.8%',
            'hero-video-offset-y-desktop': mobile?.offsetY ?? '-10%',
          },
        )}
        {...(props as any)}
      >
        <div className="mdx-hero-video__placeholder">
          <img src={placeholderSrc} alt="" />
        </div>
        <div className="mdx-hero-video__video">
          <video
            muted
            autoPlay
            onEnded={onEnded}
            onCanPlay={onCanPlay}
            ref={ref}
          >
            {children}
          </video>
        </div>
      </div>
    </>
  )
}
