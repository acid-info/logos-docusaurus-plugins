import Link from '@docusaurus/Link'
import clsx from 'clsx'
import React from 'react'
import { ButtonWithIcon } from '../../Button/ButtonWithIcon'
import { IconArrowRightCircle, IconDot } from '../../Icon/Icon'
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
        {label && (
          <label>
            <IconDot size={'s'} />
            <span>{label}</span>
          </label>
        )}
        <div>
          <div>
            <h1 className={clsx('hero__title', styles.heroTitle)}>{title}</h1>
            <p className={clsx('hero_subtitle', styles.heroSubtitle)}>
              {subtitle}
            </p>
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
      </div>
    </section>
  )
}
