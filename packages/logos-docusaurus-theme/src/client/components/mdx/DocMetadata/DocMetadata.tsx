import { Typography } from '@acid-info/lsd-react'
import clsx from 'clsx'
import React from 'react'
import './DocMetadata.scss'
import { useDocMetadata } from './useDocMetadata'

export type DocMetadataProps = React.HTMLAttributes<HTMLDivElement> & {}

export const DocMetadata: React.FC<DocMetadataProps> = ({
  className,
  children,
  ...props
}) => {
  const { date, authors } = useDocMetadata()

  return (
    <div className={clsx(className, 'mdx-doc-metadata')} {...(props as any)}>
      {date && <Typography variant="body2">{date}</Typography>}
      {authors && authors.length > 0 && (
        <>
          <Typography variant="body2">
            by {authors.map((author) => author!.name).join(', ')}
          </Typography>
        </>
      )}
    </div>
  )
}
