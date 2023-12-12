import { Button, Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import { IconDownload } from '../../Icon'
import { KeepRatio } from '../../KeepRatio'
import './AssetCard.scss'

export type DownloadableAsset = {
  src: string
  filename?: string
  title: React.ReactNode
}

export type AssetCardProps = Omit<React.HTMLProps<HTMLDivElement>, 'title'> & {
  /**
   * The title of the asset
   */
  title?: React.ReactNode
  /**
   * The source URL for the preview image
   */
  previewSrc: string
  /**
   * Whether to force download the asset when clicking on the preview image (default: false); if false, the asset might open in a new tab
   */
  forceDownload?: boolean
  /**
   * The list of downloadable assets
   */
  downloadable?: DownloadableAsset[]
}

/**
 * A card component with an image preview and download buttons.
 *
 * @example
 * **Example usage:**
 * ```jsx
 * import { AssetCard } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
 *
 * <AssetCard
 *  title="Logo"
 *  previewSrc="/img/logo.svg"
 *  downloadable={[
 *   { src: "/img/logo.svg", title: "SVG" },
 *   { src: "/img/logo.png", title: "PNG" },
 *  ]}
 * />
 * ```
 */
export const AssetCard: React.FC<AssetCardProps> = ({
  title,
  previewSrc,
  downloadable,
  forceDownload = false,
  ...props
}) => {
  const isDownloadable = downloadable && downloadable.length > 0

  const onDownload = (
    event: React.MouseEvent,
    downloadable: DownloadableAsset,
  ) => {
    if (!forceDownload) return

    event.preventDefault()

    const { src, filename } = downloadable
    const link = document.createElement('a')
    link.download = filename || (typeof title === 'string' && title) || ''

    fetch(src)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        link.href = url
        window.document.body.appendChild(link)
        link.click()
        window.document.body.removeChild(link)
      })
      .catch((err) => {
        console.error('failed to download asset:' + err)
        link.href = src
        link.target = '_blank'
        window.document.body.appendChild(link)
        link.click()
        window.document.body.removeChild(link)
      })
  }

  return (
    <div
      {...props}
      className={clsx(
        props.className,
        'mdx-asset-card',
        isDownloadable && 'mdx-asset-card--downloadable',
      )}
    >
      <div className="mdx-asset-card__inner">
        {title && (
          <Typography
            component="div"
            variant="subtitle2"
            className="mdx-asset-card__title"
          >
            {title}
          </Typography>
        )}
        <KeepRatio
          width={16}
          height={9}
          fullWidth
          rootProps={{ className: 'mdx-asset-card__image' }}
        >
          <img
            src={previewSrc}
            alt={(typeof title === 'string' && title) || 'asset image'}
          />
        </KeepRatio>
      </div>
      {
        // TODO: use LSD ButtonGroup
      }
      {isDownloadable && (
        <div className="mdx-asset-card__downloadables">
          {downloadable.map((downloadable, index) => (
            <a
              href={downloadable.src}
              target="_blank"
              download
              onClick={(event) => onDownload(event, downloadable)}
            >
              <Button
                key={index}
                variant="outlined"
                size="small"
                icon={<IconDownload />}
              >
                {downloadable.title}
              </Button>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
