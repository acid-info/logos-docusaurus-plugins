import { ButtonProps, Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import { CallToActionButton } from '../index'
import './VideoSection.scss'
import { IconPlay } from '../../../components/Icon'
import Link from '@docusaurus/Link'

export type VideoSectionProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  /**
   * The title of the section
   */
  title?: React.ReactNode
  /**
   * The description of the section
   */
  description?: React.ReactNode
  /**
   * The number of columns to display the content in
   */
  columns?: 1 | 2
  /**
   * The URL to link to when the button is clicked
   */
  href?: string
  /**
   * The label to display on the button
   */
  label?: string
  /**
   * The target attribute for the link e.g., `_self`, `_blank`
   */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target']
  /**
   * Whether to display a border-top in the section
   */
  border?: boolean
  /**
   * The text alignment of the section
   */
  align?: 'unset' | 'left' | 'right' | 'center'
  /**
   * The variant of the button
   */
  variant?: ButtonProps['variant']
  /**
   * The position of the call-to-action button
   */
  ctaPosition?: 'top' | 'bottom'
  /**
   * A list of items to display in the section
   */
  src: string
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  label,
  href,
  title,
  columns = 1,
  description,
  target,
  border = true,
  src,
  align = 'unset',
  className,
  children,
  variant = 'outlined',
  ctaPosition = 'bottom',
  ...props
}) => {
  const withDescription = !!description
  const withButton = !!href

  const display =
    title && !withDescription && !withButton
      ? 'title-only'
      : title && !description && withButton
      ? 'title-button'
      : title && description && columns === 2
      ? `full-width`
      : title && description
      ? 'list'
      : 'simple'

  const button = href && ctaPosition === 'top' && (
    <CallToActionButton
      target={target}
      href={href}
      className="mdx-video-section__link"
      variant={variant}
    >
      {label}
    </CallToActionButton>
  )

  return (
    <div
      className={clsx(
        className,
        'mdx-video-section',
        `mdx-video-section--${display}`,
        !border && 'mdx-video-section--no-border',
      )}
      {...(props as any)}
    >
      <div
        className={clsx(
          'mdx-video-section__container',
          align !== 'unset' && `mdx-video-section--align-${align}`,
        )}
      >
        <div className="mdx-video-section__header">
          <IconPlay />
          <Typography
            component="h2"
            className={clsx('mdx-video-section__title')}
          >
            {title}
          </Typography>
        </div>
        {description && (
          <Typography component="h3" className="mdx-video-section__description">
            {description}
          </Typography>
        )}
        <div className="mdx-video-section__header__mobile-button">{button}</div>

        {src && ctaPosition === 'bottom' && (
          <Link href={src} target="_blank">
            <CallToActionButton
              target={target}
              href={href}
              className="mdx-video-section__link"
              variant={variant}
              size="small"
            >
              {label}
            </CallToActionButton>
          </Link>
        )}
      </div>

      <div className="mdx-video-section__video-container">
        <iframe
          width="100%"
          height="100%"
          src={src}
          title="Waku Tutorial 001 : Introduction to Waku"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="mdx-video-section__video"
        ></iframe>
      </div>
    </div>
  )
}
