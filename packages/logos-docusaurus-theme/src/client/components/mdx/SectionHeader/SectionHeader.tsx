import { Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import { Box, BoxProps } from '..'
import './SectionHeader.scss'

export type SectionHeaderProps = Omit<BoxProps, 'title'> & {
  title?: React.ReactNode
  description?: React.ReactNode
  noBorder?: boolean
}

export const SectionHeader: React.FC<
  React.PropsWithChildren<SectionHeaderProps>
> = ({ title, description, className, noBorder, children, ...props }) => {
  const withDescription = !!description

  return (
    <Box
      className={clsx(
        className,
        'mdx-section-header',
        withDescription && 'mdx-section-header--with-description',
        noBorder && 'mdx-section-header--no-border',
      )}
      {...props}
    >
      <Typography
        className="mdx-section-header__title"
        component="h2"
        variant="h2"
      >
        {title}
        {!withDescription && children && (
          <div className="mdx-section-header__extra">{children}</div>
        )}
      </Typography>

      {description && (
        <Typography
          className="mdx-section-header__description"
          component="p"
          variant="h3"
        >
          {description}
          {<div className="mdx-section-header__extra">{children}</div>}
        </Typography>
      )}
    </Box>
  )
}
