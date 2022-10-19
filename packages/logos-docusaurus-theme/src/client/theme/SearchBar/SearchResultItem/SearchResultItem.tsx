import Link, { Props as LinkProps } from '@docusaurus/Link'
import clsx from 'clsx'
import React from 'react'
import DocumentIcon from '../../../static/icons/document.svg'
import BlockIcon from '../../../static/icons/hashtag.svg'
import { SearchResultItemBase } from '../SearchResultItemBase'
import { SearchDocumentType } from '../types'
import styles from './SearchResultItem.module.scss'

const icons: Record<SearchDocumentType, React.ReactElement> = {
  [SearchDocumentType.Title]: (
    <DocumentIcon className={clsx(styles.icon, styles.l1, styles.stroke)} />
  ),
  [SearchDocumentType.Heading]: (
    <BlockIcon className={clsx(styles.icon, styles.l2, styles.fill)} />
  ),
  [SearchDocumentType.Paragraph]: (
    <BlockIcon className={clsx(styles.icon, styles.l2, styles.fill)} />
  ),
}

export type SearchResultItemProps = React.HTMLProps<HTMLLIElement> & {
  type: string | SearchDocumentType
  title: string
  href: string
  content?: string
  linkProps?: LinkProps
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  type,
  href,
  title,
  content,
  className,
  linkProps: { className: linkClassName, ...linkProps } = {},
  ...props
}) => {
  const icon = icons[type]

  return (
    <Link
      href={href}
      className={clsx(styles.root, linkClassName)}
      {...linkProps}
    >
      <SearchResultItemBase
        title={title}
        content={content}
        icon={icon}
        {...props}
      />
    </Link>
  )
}
