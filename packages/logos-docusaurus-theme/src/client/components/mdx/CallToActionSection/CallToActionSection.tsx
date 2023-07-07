import { ButtonProps, Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import { CallToActionButton } from '../index'
import './CallToActionSection.scss'

export type CallToActionSectionProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  title?: React.ReactNode
  description?: React.ReactNode
  columns?: 1 | 2
  href?: string
  label?: string
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target']
  variant?: ButtonProps['variant']
  list?: {
    title: React.ReactNode
    description: React.ReactNode
  }[]
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  label,
  href,
  title,
  columns = 1,
  description,
  list = [],
  target,
  className,
  children,
  variant = 'outlined',
  ...props
}) => {
  const withDescription = !!description
  const withList = list.length > 0

  const display =
    title && !withDescription && !withList
      ? 'title-only'
      : title && description && columns === 2
      ? `full-width`
      : title && description && list.length > 0
      ? 'list'
      : 'simple'

  return (
    <div
      className={clsx(
        className,
        'mdx-cta-section',
        `mdx-cta-section--${display}`,
      )}
      {...(props as any)}
    >
      <div className="mdx-cta-section__container">
        <Typography component="h2" className="mdx-cta-section__title">
          {title}
        </Typography>
        <Typography component="h3" className="mdx-cta-section__description">
          {description}
        </Typography>
        {href && (
          <CallToActionButton
            target={target}
            href={href}
            className="mdx-cta-section__link"
            variant={variant}
          >
            {label}
          </CallToActionButton>
        )}
      </div>
      {list.length > 0 && (
        <div className="mdx-cta-section__list">
          {list.map((option, index) => (
            <div key={index}>
              <Typography variant="subtitle1" component="div">
                {option.title}
              </Typography>
              <Typography variant="h3" component="p">
                {option.description}
              </Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
