import { Button, Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import './CallToActionSection.scss'

export type CallToActionSectionProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  title?: React.ReactNode
  description?: React.ReactNode
  href?: string
  label?: string
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  label,
  href,
  title = '',
  description,
  className,
  children,
  ...props
}) => {
  return (
    <div
      variant="h1"
      component="h1"
      className={clsx(
        className,
        'mdx-cta-section',
        description && 'mdx-cta-section--with-description',
      )}
      {...(props as any)}
    >
      <Typography
        variant={description ? 'h6' : 'h1'}
        component="span"
        className="mdx-cta-section__title"
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant="h4"
          component="span"
          className="mdx-cta-section__description"
        >
          {description}
        </Typography>
      )}
      <Typography
        className="mdx-cta-section__link"
        variant="body1"
        component="a"
        href={href}
        target="_blank"
      >
        <Button size="large" variant="filled">
          {label}
        </Button>
      </Typography>
    </div>
  )
}
