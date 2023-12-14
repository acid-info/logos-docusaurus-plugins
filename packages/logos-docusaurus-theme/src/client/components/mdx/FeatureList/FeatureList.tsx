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
  /**
   * The title of the feature list.
   */
  title?: React.ReactNode
  /**
   * An array of features to be displayed in the list.
   */
  features?: Feature[]
  /**
   * The vertical alignment of feature description.
   */
  alignment?: 'bottom' | 'top'

  /**
   * The position of the call to action buttons.
   */
  ctaPosition?: 'top' | 'bottom'
}

/**
 * A component that displays a list of features with titles and descriptions.
 *
 * @example
 * ```tsx
 * import { FeatureList } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
 *
 * <FeatureList
 *   title="Features"
 *   alignment="top"
 *   features={[
 *     { title: 'Feature 1', description: 'Description of feature 1' },
 *     { title: 'Feature 2', description: 'Description of feature 2' },
 *     { title: 'Feature 3', description: 'Description of feature 3' },
 *   ]}
 * >
 *  <CallToActionButton variant="outlined" href="/about/" target="_self">
 *     Read More
 *  </CallToActionButton>
 * </FeatureList>
 * ```
 */
export const FeatureList: React.FC<FeatureListProps> = ({
  title = 'Features',
  alignment = 'bottom',
  features = [],
  className,
  ctaPosition = 'bottom',
  children,
  ...props
}) => {
  return (
    <div
      className={clsx(
        className,
        'mdx-feature-list',
        `mdx-feature-list--${alignment}-aligned`,
        `mdx-feature-list--cta-${ctaPosition}`,
      )}
      {...props}
    >
      <div className="mdx-feature-list__header">
        <Typography
          variant="h5"
          component="h1"
          className="mdx-feature-list__title"
        >
          {title}
        </Typography>
        {children && ctaPosition === 'top' && (
          <div className="mdx-feature-list__extra">{children}</div>
        )}
      </div>
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
                variant="h2"
                component="h2"
                className="mdx-feature-list__feature-title"
              >
                {feature.title}
              </Typography>
              <Typography
                variant="h5"
                component="h3"
                className="mdx-feature-list__feature-description"
              >
                <span>{feature.description}</span>
              </Typography>
            </div>
            <div className="mdx-feature-list__feature-border"></div>
          </div>
        ))}
      </div>
      {children && ctaPosition === 'bottom' && (
        <div className="mdx-feature-list__extra">{children}</div>
      )}
    </div>
  )
}
