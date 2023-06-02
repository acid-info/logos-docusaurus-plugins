import { ArrowDownIcon, IconButton } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React, { HTMLProps } from 'react'
import styles from './styles.module.scss'

type TProps = {
  bottom: number
}

export const ScrollToBottom = (
  props: TProps & HTMLProps<HTMLButtonElement>,
): JSX.Element => {
  const { children, className, bottom, ...rest } = props

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    })
  }

  return (
    <IconButton
      onClick={handleScrollToBottom}
      size="small"
      className={clsx(styles.scrollToBottom, className)}
      style={{ bottom: -(bottom - 16) }}
      {...(rest as any)}
    >
      <ArrowDownIcon color="primary" />
    </IconButton>
  )
}
