import { Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import { Box, BoxProps } from '..'
import './SectionHeader.scss'

export type SectionHeaderProps = Omit<BoxProps, 'title'> & {
  title?: React.ReactNode
  description?: React.ReactNode
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  className,
  children,
  ...props
}) => {
  return (
    <Box className={clsx(className, 'mdx-section-header')} {...props}>
      <Typography
        className="mdx-section-header__title"
        component="h2"
        variant="h5"
      >
        {title}
      </Typography>

      {description && (
        <Typography
          className="mdx-section-header_description"
          component="p"
          variant="h4"
        >
          {description}
        </Typography>
      )}
    </Box>
  )
}
