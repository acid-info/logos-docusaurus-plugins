import { Typography } from '@acid-info/lsd-react'
import ThemedImage from '@theme/ThemedImage'
import clsx from 'clsx'
import React from 'react'
import styles from './ComponentCard.module.scss'
import Link, { Props as LinkProps } from '@docusaurus/Link'

export type ComponentCardProps = Omit<LinkProps, 'title' | 'color'> & {
  title: React.ReactNode
  imageSrc?: string
  imageDarkSrc?: string
  imageWidth?: string | number
  imageHeight?: string | number
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  imageSrc,
  imageDarkSrc,
  imageWidth,
  imageHeight,
  ...props
}) => {
  return (
    <Link {...props} className={clsx(props.className, styles.root)}>
      <Typography className={styles.title} component="div">
        {title}
      </Typography>
      <div className={styles.imageContainer}>
        <ThemedImage
          width={imageWidth}
          height={imageHeight}
          sources={{
            dark: imageDarkSrc || imageSrc || '',
            light: imageSrc || imageDarkSrc || '',
          }}
        />
      </div>
    </Link>
  )
}
