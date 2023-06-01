import { Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import './FeatureList.scss'

export type Feature = {
  title: React.ReactNode
  description: React.ReactNode
}

export type FeatureListProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  title?: React.ReactNode
  features?: Feature[]
}

export const FeatureList: React.FC<FeatureListProps> = ({
  title = 'Features',
  features = [],
  className,
  children,
  ...props
}) => {
  return (
    <div className={clsx(className, 'mdx-feature-list')} {...props}>
      <Typography
        variant="h6"
        component="h1"
        className="mdx-feature-list__title"
      >
        {title}
      </Typography>
      <div className="mdx-feature-list__list">
        {features.map((feature, index) => (
          <div key={index} className={clsx('mdx-feature-list__feature')}>
            <div className="mdx-feature-list__feature-inner">
              <Typography
                variant="subtitle1"
                component="div"
                className="mdx-feature-list__feature-index"
              >
                {index + 1}
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                className="mdx-feature-list__feature-title"
              >
                {feature.title}
              </Typography>
              <Typography
                variant="h6"
                component="h3"
                className="mdx-feature-list__feature-description"
              >
                {feature.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
      <div className="mdx-feature-list__extra">{children}</div>
    </div>
  )
}
