import { Typography, Tag } from '@acid-info/lsd-react'
import ThemedImage from '@theme/ThemedImage'
import clsx from 'clsx'
import React from 'react'
import './NewsCard.scss'
import { IconExternalLink } from '../../../components/Icon/Icon'

export type NewsCardProps = React.HTMLProps<HTMLAnchorElement> & {
  thumbnail?: string
  title: string
  date: React.ReactNode
  author: string
  description?: string
  tags?: string[]
}

export const NewsCard: React.FC<NewsCardProps> = ({
  thumbnail,
  title,
  date,
  author,
  description = '',
  tags = [],
  ...props
}) => {
  return (
    <a
      target="_blank"
      {...props}
      className={clsx(props.className, 'mdx-news-card')}
    >
      {thumbnail && (
        <div className="mdx-news-card-thumbnail__container">
          <ThemedImage
            sources={{
              dark: thumbnail,
              light: thumbnail,
            }}
            alt={title ?? 'news thumbnail'}
            className="mdx-news-card__thumbnail"
          />
          <div className="mdx-news-card__external-link-icon">
            <IconExternalLink className="mdx-jpd__external-link-icon" />
          </div>
        </div>
      )}

      <Typography component="h3" variant="h4" className="mdx-news-card__title">
        {title}
      </Typography>
      <div className="mdx-news-card__row">
        <div className="mdx-news-card__info">
          {date && (
            <>
              <Typography variant="body2">{date}</Typography>
              <Typography variant="body2">·</Typography>
            </>
          )}
          <Typography variant="body2">by {author}</Typography>
        </div>
      </div>
      {description && (
        <Typography variant="body2" className="mdx-news-card__description">
          {description}
        </Typography>
      )}
      {tags?.length > 0 && (
        <div className="mdx-news-card__tags">
          {tags.map((tag, index) => (
            <Tag key={index} size="small" className="mdx-news-card__tag">
              {tag}
            </Tag>
          ))}
        </div>
      )}
    </a>
  )
}
