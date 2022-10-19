import copy2clipboard from 'copy-to-clipboard'
import React from 'react'
import { IconButton } from '@logos-theme/components/IconButton/index'
import Icon from '../../../static/icons/share.svg'
import styles from './styles.module.scss'

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
