import { LightBoxWrapper } from '@acid-info/logos-docusaurus-theme/lib/client/containers/LightBox'
import { CloseIcon, IconButton } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './Image.module.scss'

export type LoadedImage = {
  preSrc: string
  width: number
  height: number
  placeholder: any
  src: string
  srcSet: string
  images: {
    width: number
    height: number
    path: string
  }[]
}

export type ImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src'
> & {
  src?: string
  img?: LoadedImage | undefined | null
  minWidth?: number
}

export const Image: React.FC<ImageProps> = ({
  minWidth = 0,
  src,
  img,
  ...rest
}) => {
  const [enlarged, setEnlarged] = useState(false)
  const singleImage = !img?.images || img.images.length === 0

  const originalImage = {
    src: src,
    width: rest.width,
    height: rest.height,
  }

  const images = img?.images || []

  const sorted = useMemo(
    () =>
      [...images]
        .sort((a, b) => a.width - b.width)
        .filter((img) => img.width >= minWidth),
    [images],
  )

  const [smallest] = [sorted[0] ?? originalImage]
    .map(
      (img) =>
        img && {
          width: img.width,
          height: img.height,
          src: 'src' in img ? img.src : 'path' in img ? img.path : '',
        },
    )
    .filter((img) => !!img)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEnlarged(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const imageElement = (
    <img
      src={smallest!.src as string}
      width={smallest!.width}
      height={smallest!.height}
      onClick={() => !singleImage && setEnlarged(true)}
      {...rest}
      className={clsx(
        styles.image,
        !singleImage && styles.thumbnail,
        rest.className,
      )}
    />
  )

  return (
    <>
      {img ? imageElement : <LightBoxWrapper>{imageElement}</LightBoxWrapper>}
      {enlarged && (
        <div className={styles.overlay}>
          <IconButton
            size="small"
            onClick={() => setEnlarged(false)}
            className={styles.closeButton}
          >
            <CloseIcon color="primary" />
          </IconButton>
          <img
            src={originalImage.src as string}
            {...rest}
            className={styles.enlarged}
          />
        </div>
      )}
    </>
  )
}
