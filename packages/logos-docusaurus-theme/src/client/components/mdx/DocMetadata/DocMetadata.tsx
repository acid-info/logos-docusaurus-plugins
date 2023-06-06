import { Typography } from '@acid-info/lsd-react'
import Link from '@docusaurus/Link'
import clsx from 'clsx'
import React from 'react'
import { useDocThemeOptions } from '../../../lib/useThemeOptions'
import './DocMetadata.scss'
import { useDocMetadata } from './useDocMetadata'

export type DocMetadataProps = React.HTMLAttributes<HTMLDivElement> & {}

export const DocMetadata: React.FC<DocMetadataProps> = ({
  className,
  children,
  ...props
}) => {
  const { date, authors } = useDocMetadata()
  const { content: { authorPage } = {} } = useDocThemeOptions()

  return (
    <div className={clsx(className, 'mdx-doc-metadata')} {...(props as any)}>
      {date && <Typography variant="body2">{date}</Typography>}
      {authors && authors.length > 0 && (
        <>
          <Typography variant="body2">
            by{' '}
            {authors.map((author, index) => (
              <React.Fragment key={author!.key}>
                {authorPage ? (
                  <Link to={`author/${author!.key}`}>{author!.name}</Link>
                ) : (
                  author!.name
                )}
                {index < authors.length - 1 && ', '}
              </React.Fragment>
            ))}
          </Typography>
        </>
      )}
    </div>
  )
}
