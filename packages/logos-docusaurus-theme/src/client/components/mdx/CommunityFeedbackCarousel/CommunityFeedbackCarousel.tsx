import React, { useRef, useState, useEffect } from 'react'
import clsx from 'clsx'
import './CommunityFeedbackCarousel.scss'
import { Grid, SectionHeader } from '..'
import { useHydrated } from '../../../lib/useHydrated'
import { Typography } from '@acid-info/lsd-react'
import { ScrollButtons } from '../ScrollButtons'
import Link from '@docusaurus/Link'
import { IconX } from '../../Icon'

export type CommunityFeedbackCarouselItem = {
  url: string
  user: {
    displayName: string
    handle: string
    image?: string
  }
  content: string
}

export type CommunityFeedbackCarouselProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  title?: React.ReactNode
  description?: React.ReactNode
  gridGap?: string | number
  autoScrollInterval?: number
  items?: CommunityFeedbackCarouselItem[]
}

export const CommunityFeedbackCarousel: React.FC<
  CommunityFeedbackCarouselProps
> = ({
  title,
  description = '',
  gridGap = '16px',
  autoScrollInterval = 5000,
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

  if (typeof window !== 'undefined' && hydrated && !containerRef.current) {
    containerRef.current =
      ref.current?.querySelector('.mdx-grid__content') ?? null
  }

  const MAX_LINES = 5

  useEffect(() => {
    if (!hydrated) return

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
        const maxHeight = lineHeight * MAX_LINES
        const actualHeight = textElement.scrollHeight

        setIsTruncated((prev) => ({
          ...prev,
          [idx]: actualHeight > maxHeight,
        }))
      })
    }

    calculateTruncation()
    window.addEventListener('resize', calculateTruncation)

    return () => {
      window.removeEventListener('resize', calculateTruncation)
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
          autoScroll={!isHovered}
          autoScrollInterval={autoScrollInterval}
          infiniteScroll={true}
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
              <div className="mdx-community-feedback__item-content">
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
                        }
                      : {
                          display: 'block',
                          whiteSpace: 'pre-wrap',
                        }
                  }
                >
                  {item.content}
                </Typography>
                {itemIsTruncated && !isExpanded && (
                  <div className="mdx-community-feedback__item-see-more">
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
            </Grid.Item>
          )
        })}
      </Grid>
    </div>
  )
}
