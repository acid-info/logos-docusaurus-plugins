import { Typography } from '@acid-info/lsd-react'
import ThemedImage from '@theme/ThemedImage'
import clsx from 'clsx'
import React, { useRef } from 'react'
import './LogoCarousel.scss'
import { Grid, SectionHeader } from '..'
import { ScrollButtons } from '../ScrollButtons'
import { useHydrated } from '../../../lib/useHydrated'

export type LogoCarouselProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  title?: React.ReactNode
  gridGap?: string | number
  items?: {
    title?: string
    logoSrc?: string
    logoSrcDark?: string
  }[]
}

export const LogoCarousel: React.FC<LogoCarouselProps> = ({
  title,
  gridGap = '80px',
  className,
  items = [],
  children,
  ...props
}) => {
  const hydrated = useHydrated()
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLElement | null>(null)

  if (typeof window !== 'undefined' && hydrated && !containerRef.current) {
    containerRef.current =
      ref.current?.querySelector('.mdx-grid__content') ?? null
  }

  return (
    <div ref={ref} className={clsx(className, 'mdx-logo-carousel')} {...props}>
      <SectionHeader title={title} noBorder />
      <div className="mdx-logo-carousel-buttons">
        <ScrollButtons containerRef={containerRef} spacing="spaced" />
      </div>
      <Grid
        className="mdx-logo-carousel__inner"
        xs={{ wrap: false, gap: gridGap, scrollButtons: false }}
      >
        {items.map((item) => (
          <Grid.Item className="mdx-logo-carousel__item">
            <ThemedImage
              className="mdx-logo-carousel__logo"
              title={item.title}
              sources={{
                dark: item.logoSrcDark ?? item.logoSrc ?? '',
                light: item.logoSrc ?? item.logoSrcDark ?? '',
              }}
            />
          </Grid.Item>
        ))}
      </Grid>
    </div>
  )
}
