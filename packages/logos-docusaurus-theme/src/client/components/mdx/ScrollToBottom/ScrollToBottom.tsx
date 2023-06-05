import { ArrowDownIcon, IconButton } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React, { HTMLProps } from 'react'
import styles from './styles.module.scss'
import { useScrollY } from '../../../lib/useScrollY'
import { calcHeroInfoMb, isMobile } from '../../../lib/ui.utils'

type TProps = {}

export const ScrollToBottom = (
  props: TProps & HTMLProps<HTMLButtonElement>,
): JSX.Element => {
  const { children, className, ...rest } = props
  const scrollY = useScrollY()
  const handleScrollToBottom = () => {
    const article = document.querySelector('.main-wrapper article')
    const secondElement = article?.children?.[1]

    if (!secondElement)
      return void window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })

    if (isMobile()) {
      window.scrollTo(0, secondElement.getBoundingClientRect().top - 200)
    } else {
      ;(secondElement as HTMLElement)?.scrollIntoView?.({ behavior: 'smooth' })
    }
    return
  }

  return (
    <IconButton
      onClick={handleScrollToBottom}
      size="small"
      className={clsx(
        styles.scrollToBottom,
        className,
        scrollY > 20 ? styles.hide : '',
      )}
      {...(rest as any)}
    >
      <ArrowDownIcon color="primary" />
    </IconButton>
  )
}
