import Link from '@docusaurus/Link'
import clsx from 'clsx'
import React from 'react'
import { ButtonWithIcon } from '../../Button/ButtonWithIcon'
import { IconArrowRightCircle } from '../../Icon'
import styles from './style.module.scss'

type TProps = {
  title: string
  subtitle: string
  linkUrl?: string
  linkText?: string
  label?: string
  children: React.ReactNode
}

export const Hero = (props: TProps): JSX.Element => {
  const { children, title, subtitle, label, linkUrl, linkText } = props
  return (
    <section className={styles.Hero}>
      <div className={clsx('hero', styles.HeroContainer)}>
        {label && <label>label</label>}
        <div>
          <h1 className={'hero__title'}>{title}</h1>
          <p className={'hero_subtitle sub4'}>{subtitle}</p>
        </div>
        {linkUrl && linkText && (
          <Link href={linkUrl}>
            <ButtonWithIcon
              className={'button--secondary'}
              icon={<IconArrowRightCircle />}
            >
              {linkText}
            </ButtonWithIcon>
          </Link>
        )}
      </div>
    </section>
  )
}
