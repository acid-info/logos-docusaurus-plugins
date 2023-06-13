import React from 'react'
import clsx from 'clsx'
import Translate from '@docusaurus/Translate'
import Tag from '@theme/Tag'
import type { Props } from '@theme/TagsListInline'

import styles from './styles.module.css'
import { Typography } from '@acid-info/lsd-react'

export default function TagsListInline({ tags }: Props): JSX.Element {
  return (
    <div className={styles.root}>
      <Typography variant="body2" component="div">
        <Translate
          id="theme.tags.tagsListLabel"
          description="The label alongside a tag list"
        >
          Tags:
        </Translate>
      </Typography>
      <ul className={clsx(styles.tags, 'padding--none', 'margin-left--sm')}>
        {tags.map(({ label, permalink: tagPermalink }) => (
          <li key={tagPermalink} className={styles.tag}>
            <Tag label={label} permalink={tagPermalink} />
          </li>
        ))}
      </ul>
    </div>
  )
}
