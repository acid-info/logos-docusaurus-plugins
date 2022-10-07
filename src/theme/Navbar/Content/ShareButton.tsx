import { IconButton } from '@site/src/components/IconButton'
import React from 'react'
import Icon from '@site/static/icons/share.svg'
import styles from './styles.module.scss'
import copy2clipboard from 'copy-to-clipboard'

export const ShareButton: React.FC<{}> = ({}) => {
  return (
    <IconButton
      title="share this page"
      aria-label="share this page"
      onClick={() => {
        if (typeof navigator?.share === 'function') navigator.share()
        else copy2clipboard(window.location.href)
      }}
      className={styles.shareButton}
    >
      <Icon />
    </IconButton>
  )
}
