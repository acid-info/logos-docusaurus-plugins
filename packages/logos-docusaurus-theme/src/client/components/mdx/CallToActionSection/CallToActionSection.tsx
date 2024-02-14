import { ButtonProps, Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import { CallToActionButton } from '../index'
import './CallToActionSection.scss'
import { IconExternalLink } from '@logos-theme/components/Icon'

/**
 * Props for the CallToActionSection component
 */
export type CallToActionSectionProps = Omit<
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
   * A list of items to display in the section
   */
  list?: {
    /**
     * The title of the list item
     */
    title: React.ReactNode
    /**
     * The description of the list item
     */
    description: React.ReactNode
    /**
     * The URL to link to when the button is clicked
     */
    href?: string
  }[]
}

/**
 * A call-to-action section component that can be used in MDX pages.
 *
 * @example
 * ```tsx
 * import { CallToActionSection } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx';
 *
 * <CallToActionSection
 *   title="Logos Network State"
 *   columns={1}
 *   description="Waku is powering the communication layer of the Logos Network State. Logos is a grassroots movement to provide trust-minimised, corruption-resistant governing services and social institutions to peaceful people worldwide. Learn more about our ambitious vision."
 *   label="Explore Logos"
 *   href="https://logos.co/"
 *   target="_blank"
 * />
 * ```
 *
 * With a list:
 * ```tsx
 * import { CallToActionSection } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx';
 *
 * <CallToActionSection
 *   title="Run Nimbus in one of three setups"
 *   description={
 *     <>
 *       Follow the detailed<br/>step-by-step guide here
 *     </>
 *   }
 *   list={[
 *     {
 *       title: "Simple setup",
 *       description: "Run integrated Nimbus Beacon Node and Validator Client together."
 *     },
 *     {
 *       title: "Use Nimbus Beacon node",
 *       description: "Run Nimbus Beacon Node with an alternative validator client."
 *     },
 *     {
 *       title: "Use Nimbus Validator client",
 *       description: "Run Nimbus Validator Client with an alternative Beacon Node"
 *     }
 *   ]}
 *   label="Get Nimbus"
 *   target="_blank"
 *   href="https://nimbus.guide/quick-start.html"
 * />
 * ```
 */
export const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  label,
  href,
  title,
  columns = 1,
  description,
  list = [],
  target,
  border = true,
  align = 'unset',
  className,
  children,
  variant = 'outlined',
  ...props
}) => {
  const withDescription = !!description
  const withList = list.length > 0
  const withButton = !!href

  const display =
    title && !withDescription && !withButton && !withList
      ? 'title-only'
      : title && !description && !withList && withButton
      ? 'title-button'
      : title && description && columns === 2
      ? `full-width`
      : title && description && list.length > 0
      ? 'list'
      : 'simple'

  return (
    <div
      className={clsx(
        className,
        'mdx-cta-section',
        `mdx-cta-section--${display}`,
        !border && 'mdx-cta-section--no-border',
      )}
      {...(props as any)}
    >
      <div
        className={clsx(
          'mdx-cta-section__container',
          align !== 'unset' && `mdx-cta-section--align-${align}`,
        )}
      >
        <Typography component="h2" className="mdx-cta-section__title">
          {title}
        </Typography>
        <Typography component="h3" className="mdx-cta-section__description">
          {description}
        </Typography>
        {href && (
          <CallToActionButton
            target={target}
            href={href}
            className="mdx-cta-section__link"
            variant={variant}
          >
            {label}
          </CallToActionButton>
        )}
      </div>
      {list.length > 0 && (
        <div
          className={clsx(
            'mdx-cta-section__list',
            !border && 'mdx-cta-section--no-border',
          )}
        >
          {list.map((option, index) => {
            const content = (
              <div className="mdx-cta-section__list-item" key={index}>
                <Typography
                  component="div"
                  variant="body2"
                  className="mdx-cta-section__item-title"
                >
                  {option.title}
                  <IconExternalLink size="m" />
                </Typography>
                <Typography
                  variant="h4"
                  component="p"
                  className="mdx-cta-section__item-description"
                >
                  {option.description}
                </Typography>
              </div>
            )

            return option.href ? (
              <a href={option.href} target="_blank">
                {content}
              </a>
            ) : (
              content
            )
          })}
        </div>
      )}
    </div>
  )
}
