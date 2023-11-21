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
  logoSrc?: string
  logoSrcDark?: string
  title?: React.ReactNode
  description?: React.ReactNode
  previewSrc?: string
  previewSrcDark?: string
}

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
