import clsx from 'clsx'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { makeStyle } from '../../../lib/makeStyle'
import { settle } from '../../../lib/settle'
import { useHydrated } from '../../../lib/useHydrated'
import { useHero } from '../Hero/Hero.context'
import './HeroVideo.scss'

export type HeroVideoStyle = {
  scale?: string
  height?: string
  minHeight?: string
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
  const hydrated = useHydrated()
  const ref = useRef<HTMLVideoElement>(null)
  const [loading, setLoading] = useState(true)

  const onPlay = async () => {
    const el = ref.current
    if (!el) return

    el.muted = true
    el.defaultMuted = true

    const [res, err] = await settle(() => el.play())
    if (err) return

    setLoading(false)
  }

  useEffect(() => {
    const root = document.querySelector<HTMLDivElement>('.col > article')
    if (!root) return

    root.classList.add('overflow-hidden')

    return () => {
      root.classList.remove('overflow-hidden')
    }
  }, [])

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
            'hero-video-scale': desktop?.scale ?? '1.70951586',
            'hero-video-offset-y': desktop?.offsetY ?? '-150px',
            'hero-video-height': desktop?.height ?? '100%',
            'hero-video-min-height':
              desktop?.minHeight ?? 'min(100vh, var(--hero-max-height))',
            'hero-video-scale-mobile': mobile?.scale ?? '1.70951586',
            'hero-video-offset-y-mobile': mobile?.offsetY ?? '-50px',
            'hero-video-height-mobile': mobile?.height ?? '120%',
            'hero-video-min-height-mobile': mobile?.minHeight ?? '100vh',
          },
        )}
        {...(props as any)}
      >
        <div className="mdx-hero-video__placeholder">
          <img src={placeholderSrc} alt="" />
        </div>
        <div className="mdx-hero-video__video">
          {hydrated && (
            <video
              ref={ref}
              loop
              muted
              autoPlay
              playsInline
              onCanPlay={onPlay}
              onLoadedMetadata={onPlay}
            >
              {children}
            </video>
          )}
        </div>
      </div>
    </>
  )
}
