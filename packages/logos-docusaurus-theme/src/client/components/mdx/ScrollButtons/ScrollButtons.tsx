import {
  ChevronLeftIcon,
  ChevronRightIcon,
  IconButton,
  IconButtonGroup,
} from '@acid-info/lsd-react'
import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'
import './ScrollButtons.scss'

export type ScrollButtonsProps = React.HTMLProps<HTMLDivElement> & {
  containerId?: string
  containerRef?: React.RefObject<HTMLElement>
  leftLabel?: string
  rightLabel?: string
  spacing?: 'spaced' | 'grouped'
  autoScroll?: boolean
  autoScrollInterval?: number
  infiniteScroll?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const ScrollButtons: React.FC<ScrollButtonsProps> = ({
  leftLabel,
  rightLabel,
  containerRef,
  containerId,
  spacing = 'grouped',
  autoScroll = false,
  autoScrollInterval = 5000,
  infiniteScroll = false,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isHoveredRef = useRef(false)

  const scroll = (direction: -1 | 1) => {
    const el = containerRef
      ? containerRef.current
      : document.querySelector(`#${containerId}`)
    if (!el) return

    el.classList.add('mdx-scroll-buttons-container')

    const firstItem = el.children[0] as HTMLElement
    if (!firstItem) return

    const computedStyle = window.getComputedStyle(el)
    const gap = parseInt(computedStyle.gap) || 16

    const itemWidth = firstItem.offsetWidth + gap

    const isMobile = window.innerWidth < 1024
    const itemsToScroll = isMobile ? 1 : 2

    if (infiniteScroll) {
      const isAtStart = el.scrollLeft <= 0
      const isAtEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1

      if (direction === -1 && isAtStart) {
        el.scrollTo({
          behavior: 'smooth',
          left: el.scrollWidth - el.clientWidth,
        })
        return
      } else if (direction === 1 && isAtEnd) {
        el.scrollTo({
          behavior: 'smooth',
          left: 0,
        })
        return
      }
    }

    el.scrollTo({
      behavior: 'smooth',
      left: el.scrollLeft + itemWidth * itemsToScroll * direction,
    })
  }

  const startAutoScroll = () => {
    if (!autoScroll || isHoveredRef.current) return

    timerRef.current = setInterval(() => {
      scroll(1)
    }, autoScrollInterval)
  }

  const stopAutoScroll = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const resetAutoScroll = () => {
    stopAutoScroll()
    startAutoScroll()
  }

  const handleNextClick = () => {
    scroll(1)
    resetAutoScroll()
  }

  const handlePrevClick = () => {
    scroll(-1)
    resetAutoScroll()
  }

  useEffect(() => {
    if (autoScroll) {
      startAutoScroll()
    }

    return () => {
      stopAutoScroll()
    }
  }, [autoScroll, autoScrollInterval])

  return (
    <div
      {...props}
      className={clsx(
        props.className,
        'mdx-scroll-buttons',
        spacing === 'spaced' && 'mdx-scroll-buttons--spaced',
      )}
    >
      <IconButtonGroup size="small" color="primary">
        <IconButton
          className={clsx(
            'mdx-scroll-buttons__button',
            leftLabel &&
              leftLabel.length > 0 &&
              'mdx-scroll-buttons__button--with-label',
          )}
          size="small"
          onClick={handlePrevClick}
        >
          <ChevronLeftIcon />
          {leftLabel && leftLabel.length > 0 && (
            <span className="mdx-scroll-buttons__label">{leftLabel}</span>
          )}
        </IconButton>
        <IconButton
          className={clsx(
            'mdx-scroll-buttons__button',
            rightLabel &&
              rightLabel.length &&
              'mdx-scroll-buttons__button--with-label',
          )}
          size="small"
          onClick={handleNextClick}
        >
          {rightLabel && rightLabel.length > 0 && (
            <span className="mdx-scroll-buttons__label">{rightLabel}</span>
          )}
          <ChevronRightIcon />
        </IconButton>
      </IconButtonGroup>
    </div>
  )
}
