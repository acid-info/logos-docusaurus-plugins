import { clsx } from 'clsx'
import React from 'react'
import { LinkButtonWithIcon } from '../../Button/LinkButtonWithIcon'
import { IconArrowRightCircle, IconFolder } from '../../Icon'
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
        return <IconArrowRightCircle />
      case 'pdf':
        return <IconArrowRightCircle />
      default:
        return null
    }
  })()

  return (
    <div className={clsx('alert', styles.container)}>
      <div>
        <div>{icon}</div>
        <div>{children}</div>
        <div>
          <LinkButtonWithIcon
            icon={icon}
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
