import clsx from 'clsx'
import React, { PropsWithChildren } from 'react'
import './HeroImage.scss'

export type HeroImageProps = PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
> & {
  src: string
  alt: string
}

export const HeroImage: React.FC<HeroImageProps> = ({
  src,
  alt,
  className,
  children,
  ...props
}) => {
  return (
    <div className={clsx(className, 'mdx-hero-image')} {...(props as any)}>
      <img src={src} alt={alt} className="mdx-hero-image__img" />
      {children}
    </div>
  )
}
