import { IconButton, Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import './SpecCard.scss'
import { IconExternalLink } from '../../../components/Icon'
import Link from '@docusaurus/Link'

/**
 * Props for the SpecCard component
 */
export type SpecCardProps = Omit<
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
   * The text alignment of the section
   */
  align?: 'unset' | 'left' | 'right' | 'center'
}

export const SpecCard: React.FC<SpecCardProps> = ({
  label,
  href,
  title,
  description,
  target = '_blank',
  align = 'unset',
  className,
  children,
  ...props
}) => {
  return (
    <div className={clsx(className, 'mdx-spec-card')} {...(props as any)}>
      <div
        className={clsx(
          'mdx-spec-card__container',
          align !== 'unset' && `mdx-spec-card--align-${align}`,
        )}
      >
        <div className="mdx-spec-card__header">
          <Typography
            component="h3"
            variant="h4"
            className={clsx('mdx-spec-card__title')}
          >
            {title}
          </Typography>
        </div>
        {description && (
          <Typography
            component="p"
            variant="body2"
            className="mdx-spec-card__description"
          >
            {description}
          </Typography>
        )}
        {href && (
          <Link target={target} href={href} className="mdx-spec-card__link">
            <IconButton className="mdx-spec-card__button">
              <Typography variant="body3">{label}</Typography>
              <IconExternalLink className="mdx-spec-card__button-icon" />
            </IconButton>
          </Link>
        )}
      </div>
    </div>
  )
}
