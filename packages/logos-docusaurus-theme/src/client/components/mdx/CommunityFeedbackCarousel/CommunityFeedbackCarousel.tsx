import React, { useRef, useState, useEffect } from 'react'
import clsx from 'clsx'
import './CommunityFeedbackCarousel.scss'
import { Grid, SectionHeader } from '..'
import { useHydrated } from '../../../lib/useHydrated'
import { Typography } from '@acid-info/lsd-react'
import { ScrollButtons } from '../ScrollButtons'
import Link from '@docusaurus/Link'
import { IconX } from '../../Icon'

const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= 768
}

export type CommunityFeedbackCarouselItem = {
  url: string
  user: {
    displayName: string
    handle: string
    image?: string
  }
  content: string
  postMedia?: string
}

export type CommunityFeedbackCarouselProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  title?: React.ReactNode
  description?: React.ReactNode
  gridGap?: string | number
  autoScrollInterval?: number
  desktopItemsToScroll?: number
  items?: CommunityFeedbackCarouselItem[]
}

export const CommunityFeedbackCarousel: React.FC<
  CommunityFeedbackCarouselProps
> = ({
  title,
  description = '',
  gridGap = '16px',
  autoScrollInterval = 5000,
  desktopItemsToScroll = 1,
  className,
  items = [],
  ...props
}) => {
  const hydrated = useHydrated()
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLElement | null>(null)
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({})
  const [isHovered, setIsHovered] = useState(false)
  const [isTruncated, setIsTruncated] = useState<{ [key: number]: boolean }>({})
  const [isMobile, setIsMobile] = useState(false)

  if (typeof window !== 'undefined' && hydrated && !containerRef.current) {
    containerRef.current =
      ref.current?.querySelector('.mdx-grid__content') ?? null
  }

  const MAX_LINES = 3
  const MAX_CONTENT_HEIGHT = 180

  useEffect(() => {
    if (!hydrated) return

    setIsMobile(isMobileDevice())

    const calculateTruncation = () => {
      const textElements = ref.current?.querySelectorAll(
        '.mdx-community-feedback__item-content-text',
      )
      if (!textElements) return

      textElements.forEach((element, idx) => {
        const textElement = element as HTMLElement
        const computedStyle = window.getComputedStyle(textElement)
        const lineHeight =
          parseFloat(computedStyle.lineHeight) ||
          parseFloat(computedStyle.fontSize) * 1.2
        const maxHeight = lineHeight * (MAX_LINES - 1)
        const actualHeight = textElement.scrollHeight

        setIsTruncated((prev) => ({
          ...prev,
          [idx]: actualHeight > maxHeight,
        }))
      })
    }

    const handleResize = () => {
      setIsMobile(isMobileDevice())
      calculateTruncation()
    }

    calculateTruncation()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [hydrated, items])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      ref={ref}
      className={clsx(className, 'mdx-community-feedback')}
      {...props}
    >
      <SectionHeader title={title} noBorder />
      {description && (
        <Typography
          variant="body1"
          className="mdx-community-feedback__description"
        >
          {description}
        </Typography>
      )}
      <div className="mdx-community-feedback-buttons">
        <ScrollButtons
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
          spacing="spaced"
          autoScroll={!isHovered && !isMobile}
          autoScrollInterval={autoScrollInterval}
          infiniteScroll={true}
          desktopItemsToScroll={desktopItemsToScroll}
        />
      </div>
      <Grid
        className="mdx-community-feedback__items"
        xs={{ cols: 3, wrap: false, gap: gridGap, scrollButtons: false }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((item, idx) => {
          const isExpanded = expanded[idx]
          const itemIsTruncated = isTruncated[idx] || false

          const mediaRender = (() => {
            if (!item?.postMedia) return null
            const ext = item.postMedia.split('.').pop()?.toLowerCase()
            const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
            const videoExts = ['mp4', 'webm', 'mov']
            if (imageExts.includes(ext || '')) {
              return (
                <img
                  src={item.postMedia}
                  alt={'image-' + idx}
                  className={`mdx-community-feedback__item-image ${
                    !isExpanded ? 'collapsed' : 'expanded'
                  }`}
                />
              )
            }
            if (videoExts.includes(ext || '')) {
              return (
                <video
                  src={item.postMedia}
                  className={`mdx-community-feedback__item-image ${
                    !isExpanded ? 'collapsed' : 'expanded'
                  }`}
                  autoPlay
                  playsInline
                  muted
                  loop
                />
              )
            }
            return null
          })()

          const shouldShowSeeMore = itemIsTruncated || item?.postMedia

          return (
            <Grid.Item className="mdx-community-feedback__item" key={idx}>
              <div className="mdx-community-feedback__item-header">
                <Link
                  href={item.url}
                  className="mdx-community-feedback__item-header-user"
                >
                  <img
                    className="mdx-community-feedback__item-header-user-image"
                    src={item.user.image}
                    alt={item.user.displayName}
                  />
                  <div className="mdx-community-feedback__item-header-user-info">
                    <Typography
                      variant="body2"
                      className="mdx-community-feedback__item-header-username"
                    >
                      {item.user.displayName}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="mdx-community-feedback__item-header-user-handle"
                    >
                      @{item.user.handle}
                    </Typography>
                  </div>
                </Link>
                <Link
                  className="mdx-community-feedback__item-header-link"
                  href={item.url}
                >
                  <IconX />
                </Link>
              </div>
              <div
                className="mdx-community-feedback__item-content"
                style={{
                  maxHeight:
                    !isExpanded && item?.postMedia
                      ? MAX_CONTENT_HEIGHT
                      : 'none',
                  overflow:
                    !isExpanded && item?.postMedia ? 'hidden' : 'visible',
                  position: item?.postMedia ? 'relative' : 'static',
                }}
              >
                <Typography
                  variant="body1"
                  className="mdx-community-feedback__item-content-text"
                  style={
                    !isExpanded
                      ? {
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: MAX_LINES,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }
                      : {
                          display: 'block',
                          whiteSpace: 'pre-wrap',
                        }
                  }
                >
                  {item.content}
                </Typography>
                {item.postMedia && (
                  <div className="mdx-community-feedback__media-wrapper">
                    {mediaRender}
                    {!isExpanded && (
                      <div className="mdx-community-feedback__item-gradient" />
                    )}
                  </div>
                )}
                {!isExpanded && (
                  <div className="mdx-community-feedback__item-gradient" />
                )}
                {shouldShowSeeMore && !isExpanded && (
                  <div
                    className={`mdx-community-feedback__item-see-more ${
                      item?.postMedia && itemIsTruncated ? '' : 'static'
                    }`}
                  >
                    <Typography
                      variant="body2"
                      className="mdx-community-feedback__item-see-more-text"
                      onClick={() =>
                        setExpanded((e) => ({ ...e, [idx]: true }))
                      }
                    >
                      See more..
                    </Typography>
                  </div>
                )}
              </div>
              {isExpanded && (
                <div>
                  <Typography
                    className="mdx-community-feedback__item-see-less-text"
                    variant="body2"
                    onClick={() => setExpanded((e) => ({ ...e, [idx]: false }))}
                  >
                    See less
                  </Typography>
                </div>
              )}
            </Grid.Item>
          )
        })}
      </Grid>
    </div>
  )
}
