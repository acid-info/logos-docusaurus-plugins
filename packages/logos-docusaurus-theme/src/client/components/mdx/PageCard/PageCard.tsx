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
        <Typography
          className="mdx-page-card__description"
          component="span"
          variant="body2"
        >
          {description}
        </Typography>
      </div>
    </Link>
  )
}