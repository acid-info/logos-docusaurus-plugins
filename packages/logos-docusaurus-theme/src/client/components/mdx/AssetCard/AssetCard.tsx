import { Button, Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import { KeepRatio } from '../../KeepRatio'
import './AssetCard.scss'
import { IconDownload } from '../../Icon'

export type AssetCardProps = Omit<React.HTMLProps<HTMLDivElement>, 'title'> & {
  title?: React.ReactNode
  previewSrc: string
  downloadable?: {
    src: string
    title: React.ReactNode
  }[]
}

export const AssetCard: React.FC<AssetCardProps> = ({
  title,
  previewSrc,
  downloadable,
  ...props
}) => {
  const isDownloadable = downloadable && downloadable.length > 0

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
            variant="subtitle1"
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
            <a href={downloadable.src} target="_blank" download>
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
