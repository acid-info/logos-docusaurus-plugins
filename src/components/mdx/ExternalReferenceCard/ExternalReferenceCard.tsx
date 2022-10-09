import { clsx } from 'clsx'
import React from 'react'
import { LinkButtonWithIcon } from '../../Button/LinkButtonWithIcon'
import {
  IconArrowRightCircle,
  IconFolder,
  IconFolderFilled,
  IconGithub,
} from '../../Icon'
import styles from './style.module.scss'

type TProps = {
  children: React.ReactNode
  referenceType: 'github' | 'pdf'
  linkUrl: string
  linkText: string
}

export const ExternalReferenceCard = (props: TProps): JSX.Element => {
  const { children, referenceType, linkText, linkUrl } = props

  const icon = (() => {
    switch (referenceType) {
      case 'github':
        return <IconGithub />
      case 'pdf':
        return <IconFolderFilled />
      default:
        return null
    }
  })()

  return (
    <div className={clsx('alert', styles.exref)}>
      <div className={styles.exrefContainer}>
        <div>{icon}</div>
        <div className={styles.exrefText}>{children}</div>
        <div className={styles.exrefButton}>
          <LinkButtonWithIcon
            icon={<IconArrowRightCircle />}
            linkProps={{ href: linkUrl, target: '_black' }}
            className={'button--secondary'}
          >
            {linkText}
          </LinkButtonWithIcon>
        </div>
      </div>
    </div>
  )
}
