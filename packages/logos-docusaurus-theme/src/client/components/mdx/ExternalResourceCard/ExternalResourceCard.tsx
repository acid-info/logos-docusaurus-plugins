import { Typography } from '@acid-info/lsd-react'
import ThemedImage from '@theme/ThemedImage'
import clsx from 'clsx'
import React from 'react'
import { IconExternalLink } from '../../Icon'
import './ExternalResourceCard.scss'
import { KeepRatio } from '../../KeepRatio'

export type ExternalResourceCardProps = Omit<
  React.HTMLProps<HTMLAnchorElement>,
  'title'
> & {
  /**
   * The source URL for logo image in light mode
   */
  logoSrc?: string
  /**
   * The source URL for logo image in dark mode
   */
  logoSrcDark?: string
  /**
   * The title of the external resource
   */
  title?: React.ReactNode
  /**
   * The description of the external resource
   */
  description?: React.ReactNode
  /**
   * The source URL for the preview image in light mode
   * */
  previewSrc?: string
  /**
   * The source URL for the preview image in dark mode
   */
  previewSrcDark?: string
}

/**
 * A card component with an optional image preview for displaying information about an external resource.
 *
 * @example
 * **Example usage:**
 * ```jsx
 * import { ExternalResourceCard } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
 *
 * <ExternalResourceCard
 *   title="Figma"
 *   href="https://www.figma.com/
 *   description="Design and prototype in one place with Figma."
 *   logoSrc="/img/figma-logo.svg"
 *   logoSrcDark="/img/figma-logo-dark.svg"
 *   previewSrc="/img/figma-preview.png"
 *   previewSrcDark="/img/figma-preview-dark.png"
 * />
 * ```
 */
export const ExternalResourceCard: React.FC<ExternalResourceCardProps> = ({
  title,
  logoSrc,
  logoSrcDark,
  description,
  previewSrc,
  previewSrcDark,
  ...props
}) => {
  const withPreview = !!(previewSrc || previewSrcDark)

  return (
    <a
      target="_blank"
      {...props}
      className={clsx(
        props.className,
        'mdx-erc',
        withPreview && 'mdx-erc--with-preview',
      )}
    >
      {withPreview && (
        <KeepRatio width={16} height={9} fullWidth>
          <ThemedImage
            sources={{
              dark: previewSrcDark ?? previewSrc ?? '',
              light: previewSrc ?? previewSrcDark ?? '',
            }}
            alt={(typeof title === 'string' && title) || 'preview image'}
            className="mdx-erc__preview-image"
          />
        </KeepRatio>
      )}
      <div className="mdx-erc__inner">
        {(logoSrc || logoSrcDark) && (
          <ThemedImage
            sources={{
              dark: logoSrcDark ?? logoSrc ?? '',
              light: logoSrc ?? logoSrcDark ?? '',
            }}
            alt={(typeof title === 'string' && title) || 'logo'}
            className="mdx-erc__logo"
          />
        )}
        <Typography variant="body1" component="div" className="mdx-erc__title">
          {title}
        </Typography>
        {description && (
          <Typography
            variant="label2"
            component="div"
            className="mdx-erc__description"
          >
            {description}
          </Typography>
        )}
      </div>
      <div className="mdx-erc__icon">
        <IconExternalLink className="mdx-erc__external-link" />
      </div>
    </a>
  )
}
