import { Button, Typography } from '@acid-info/lsd-react'
import React from 'react'
import './NumbersView.scss'
import Link from '@docusaurus/Link'

interface TableItem {
  title: string
}

interface TableViewProps {
  sectionTitle: string
  description?: string
  buttonText?: string
  buttonLink?: string
  buttonTarget?: string
  data: TableItem[]
}

export const NumbersView: React.FC<TableViewProps> = ({
  sectionTitle,
  description = '',
  buttonText = '',
  buttonLink = '',
  buttonTarget = '_self',
  data,
  ...props
}) => {
  return (
    <div className="mdx-numbers-view" {...props}>
      <div className="mdx-numbers-view-header">
        <div className="mdx-numbers-view-header-title">
          <Typography
            className="mdx-numbers-view-section-title"
            component="h2"
            variant="h2"
          >
            {sectionTitle}
          </Typography>
          {description && (
            <Typography
              className="mdx-numbers-view-description"
              variant="body1"
            >
              {description}
            </Typography>
          )}
        </div>
        {buttonLink && (
          <Link href={buttonLink} target={buttonTarget}>
            <Button size="large">{buttonText || 'Learn More'}</Button>
          </Link>
        )}
      </div>
      <div className="mdx-numbers-view-content">
        {data.map((item, index) => (
          <div key={index} className="mdx-numbers-view-row">
            <Typography variant="body2" className="mdx-numbers-view-number">
              {index + 1}
            </Typography>
            <Typography
              component="h3"
              variant="h4"
              className="mdx-numbers-view-title"
            >
              {item.title}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}
