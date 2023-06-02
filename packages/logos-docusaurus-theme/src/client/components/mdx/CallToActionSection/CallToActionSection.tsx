import { Button, Typography } from '@acid-info/lsd-react'
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
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  label,
  href,
  title = '',
  columns = 1,
  description,
  target,
  className,
  children,
  ...props
}) => {
  const singleCol = columns === 1

  return (
    <div
      className={clsx(
        className,
        'mdx-cta-section',
        `mdx-cta-section--cols-${columns}`,
        description && 'mdx-cta-section--with-description',
      )}
      {...(props as any)}
    >
      <Typography
        variant={singleCol && !description ? 'h1' : 'h6'}
        component="h2"
        className="mdx-cta-section__title"
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant={singleCol ? 'h2' : 'h4'}
          component="h3"
          className="mdx-cta-section__description"
        >
          {description}
        </Typography>
      )}
      {href && (
        <CallToActionButton
          target={target}
          href={href}
          className="mdx-cta-section__link"
        >
          {label}
        </CallToActionButton>
      )}
    </div>
  )
}
