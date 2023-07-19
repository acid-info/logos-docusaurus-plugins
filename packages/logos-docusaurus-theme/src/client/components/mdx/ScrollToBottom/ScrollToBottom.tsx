import { ArrowDownIcon, IconButton } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React, { HTMLProps, useMemo } from 'react'
import { useWindowSize } from 'react-use'
import { makeStyle } from '../../../lib/makeStyle'
import { useIsMobile } from '../../../lib/useIsMobile'
import { useScrollY } from '../../../lib/useScrollY'
import styles from './styles.module.scss'

type TProps = {}

export const ScrollToBottom = (
  props: TProps & HTMLProps<HTMLButtonElement>,
): JSX.Element => {
  const { children, className, style, ...rest } = props
  const scrollY = useScrollY()
  const isMobile = useIsMobile()
  const ws = useWindowSize()

  const handleScrollToBottom = () => {
    const article = document.querySelector('.main-wrapper article')
    const secondElement = article?.children?.[1]

    if (!secondElement)
      return void window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })

    return window.scrollTo({
      left: 0,
      top: secondElement.getBoundingClientRect().top - (isMobile ? 200 : 0),
      behavior: 'smooth',
    })
  }

  const maxTop = useMemo(
    () =>
      (document.querySelector('.mdx-hero')?.getBoundingClientRect()?.bottom ??
        0) + window.scrollY,
    [ws.height],
  )

  return (
    <IconButton
      onClick={handleScrollToBottom}
      size={isMobile ? 'small' : 'large'}
      className={clsx(
        styles.scrollToBottom,
        className,
        scrollY > 20 && styles.hide,
      )}
      style={makeStyle(
        { ...(style ?? {}) },
        { vh: ws.height / 100 + 'px', maxTop: maxTop + 'px' },
      )}
      {...(rest as any)}
    >
      <ArrowDownIcon color="primary" />
    </IconButton>
  )
}
