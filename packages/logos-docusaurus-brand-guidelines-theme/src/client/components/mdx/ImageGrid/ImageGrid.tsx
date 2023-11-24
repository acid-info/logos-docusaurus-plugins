import {
  Grid,
  GridProps,
} from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
import clsx from 'clsx'
import React from 'react'
import { Image, LoadedImage } from '../Image/Image'
import styles from './ImageGrid.module.scss'

type ImageType = {
  img?: { src: LoadedImage }
  alt?: string
  src: string
}

type MasonryModeProps = {
  firstColumnSize: number
  images: ImageType[]
}

// Masonry mode only has 2 columns with 1 item each.
const MasonryMode: React.FC<MasonryModeProps> = ({
  firstColumnSize,
  images,
}) => {
  const firstColumnImages = images.slice(0, firstColumnSize)
  const secondColumnImages = images.slice(firstColumnSize)

  return (
    <>
      <Grid.Item>
        {firstColumnImages.map((image, index) => (
          <div key={index} className={styles.thumbnailImageContainer}>
            <Image
              minWidth={400}
              src={image.src}
              img={image.img?.src}
              alt={image.alt ?? ''}
              className={styles.thumbnailImage}
            />
          </div>
        ))}
      </Grid.Item>
      <Grid.Item>
        {secondColumnImages.map((image, index) => (
          <div key={index} className={styles.thumbnailImageContainer}>
            <Image
              minWidth={400}
              src={image.src}
              img={image.img?.src}
              alt={image.alt ?? ''}
              className={styles.thumbnailImage}
            />
          </div>
        ))}
      </Grid.Item>
    </>
  )
}

export type ImageGridProps = GridProps & {
  images: ImageType[]
  mode?: 'masonry' | 'regular' | 'square-thumbnails'
  firstColumnSize?: number
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  mode = 'regular',
  images,
  firstColumnSize = 0,
  ...props
}) => {
  return (
    <>
      <Grid
        md={{ cols: mode === 'masonry' ? 2 : 3, gap: '16px' }}
        xs={{ cols: 2, gap: '16px' }}
        className={clsx(
          styles.imageGrid,
          mode === 'masonry' && styles.masonry,
          mode === 'regular' && styles.regular,
          mode === 'square-thumbnails' && styles.squareThumbnails,
        )}
        {...props}
      >
        {mode === 'masonry' ? (
          <MasonryMode firstColumnSize={firstColumnSize} images={images} />
        ) : (
          images.map((image, index) => (
            <Grid.Item key={index} className={styles.thumbnailImageContainer}>
              <Image
                minWidth={400}
                src={image.src}
                img={image.img?.src}
                alt={image.alt ?? ''}
                className={styles.thumbnailImage}
              />
            </Grid.Item>
          ))
        )}
      </Grid>
    </>
  )
}
