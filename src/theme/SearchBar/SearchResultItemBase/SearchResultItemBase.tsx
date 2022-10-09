import clsx from 'clsx'
import React from 'react'
import styles from './SearchResultItemBase.module.scss'

export type SearchResultItemBaseProps = React.HTMLProps<HTMLLIElement> & {
  title: string
  content?: string
  icon: React.ReactElement
}

export const SearchResultItemBase: React.FC<SearchResultItemBaseProps> = ({
  icon,
  title,
  content,
  className,
  ...props
}) => {
  return (
    <li className={clsx(styles.root, className)} {...props}>
      <span>{icon}</span>
      <div>
        {title && <div dangerouslySetInnerHTML={{ __html: title }} />}
        {content && <p dangerouslySetInnerHTML={{ __html: content }} />}
      </div>
    </li>
  )
}
