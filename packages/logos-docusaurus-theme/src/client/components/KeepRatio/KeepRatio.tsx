import clsx from 'clsx'
import React from 'react'
import styles from './KeepRatio.module.scss'

export const KeepRatio: React.FC<
  React.PropsWithChildren<{
    width: number
    height: number
    fullWidth?: boolean
    fullHeight?: boolean
    rootProps?: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
    contentProps?: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >

    keep?: boolean
    containerWidth?: number | string
    containerHeight?: number | string
  }>
> = ({
  children,
  width,
  height,
  fullHeight: _fullHeight = false,
  fullWidth: _fullWidth = true,
  rootProps,
  contentProps,
  containerWidth,
  containerHeight,
  keep = true,
}) => {
  const fullWidth = !_fullHeight && _fullWidth
  const fullHeight = !fullWidth
  const ratio = (fullHeight ? height / width : width / height) * 100

  return (
    <div
      {...(rootProps ?? {})}
      className={clsx(
        styles.root,
        fullWidth && styles.fullWidth,
        fullHeight && styles.fullHeight,
        keep && styles.keep,
        rootProps?.className,
      )}
    >
      <div
        {...(contentProps ?? {})}
        className={clsx(styles.content, contentProps?.className)}
      >
        {children}
      </div>
      {keep && (
        <svg
          style={{
            pointerEvents: 'none',
            height: fullHeight
              ? '100%'
              : containerHeight
              ? `calc(${height} / ${width} * ${containerWidth})`
              : 'auto',
            width: fullWidth
              ? '100%'
              : containerHeight
              ? `calc(${width} / ${height} * ${containerHeight})`
              : 'auto',
          }}
          viewBox={`0 0 ${fullWidth ? ratio : 100} ${fullHeight ? ratio : 100}`}
        ></svg>
      )}
    </div>
  )
}
