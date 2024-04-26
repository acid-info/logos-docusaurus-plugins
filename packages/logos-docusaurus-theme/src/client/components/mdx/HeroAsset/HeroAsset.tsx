import clsx from 'clsx'
import React, { PropsWithChildren } from 'react'
import './HeroAsset.scss'

export type HeroAssetProps = PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>

export const HeroAsset: React.FC<HeroAssetProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={clsx(className, 'mdx-hero-asset')} {...(props as any)}>
      {children}
    </div>
  )
}
