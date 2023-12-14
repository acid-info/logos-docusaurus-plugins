import {
  ChevronLeftIcon,
  ChevronRightIcon,
  IconButton,
  IconButtonGroup,
} from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import './ScrollButtons.scss'

export type ScrollButtonsProps = React.HTMLProps<HTMLDivElement> & {
  containerId?: string
  containerRef?: React.RefObject<HTMLElement>
  leftLabel?: string
  rightLabel?: string
  spacing?: 'spaced' | 'grouped'
}

export const ScrollButtons: React.FC<ScrollButtonsProps> = ({
  leftLabel,
  rightLabel,
  containerRef,
  containerId,
  spacing = 'grouped',
  ...props
}) => {
  const scroll = (direction: -1 | 1) => {
    const el = containerRef
      ? containerRef.current
      : document.querySelector(`#${containerId}`)
    if (!el) return

    const itemWidth = el.children[0]?.getBoundingClientRect?.()?.width ?? 236
    el.scrollTo({
      behavior: 'smooth',
      left:
        el.scrollLeft +
        (el.getBoundingClientRect()?.width - itemWidth) * direction,
    })
  }

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
          onClick={scroll.bind(null, -1)}
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
          onClick={scroll.bind(null, +1)}
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
