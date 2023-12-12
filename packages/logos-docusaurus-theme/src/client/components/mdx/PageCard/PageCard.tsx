import { FolderIcon, Typography } from '@acid-info/lsd-react'
import Link, { Props as LinkProps } from '@docusaurus/Link'
import clsx from 'clsx'
import React from 'react'
import './PageCard.scss'

export type PageCardProps = Omit<LinkProps, 'title'> & {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
}

/**
 * A card component used in Docusaurus auto-generated category index pages to display page links.
 *
 * @example
 * ```tsx
 * import { PageCard } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx';
 *
 * <PageCard
 *   title="Sample Page"
 *   description="This is a sample page description."
 *   href="/sample-page"
 * />
 * ```
 */
export const PageCard: React.FC<PageCardProps> = ({
  title,
  description,
  icon = <FolderIcon color="primary" />,
  target = '_self',
  ...props
}) => {
  return (
    <Link
      target={target}
      {...props}
      className={clsx(props.className, 'mdx-page-card')}
    >
      <div className="mdx-page-card__icon">{icon}</div>
      <div className="mdx-page-card__inner">
        <Typography
          className="mdx-page-card__title"
          component="span"
          variant="body1"
        >
          {title}
        </Typography>

        {!!description && (
          <Typography
            className="mdx-page-card__description"
            component="span"
            variant="body3"
          >
            {description}
          </Typography>
        )}
      </div>
    </Link>
  )
}
