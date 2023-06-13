import React from 'react'
import clsx from 'clsx'
import { useBlogPost } from '@docusaurus/theme-common/internal'
import EditThisPage from '@theme/EditThisPage'
import TagsListInline from '@theme/TagsListInline'
import ReadMoreLink from '@theme/BlogPostItem/Footer/ReadMoreLink'

import styles from './styles.module.css'

export default function BlogPostItemFooter(): JSX.Element | null {
  const { metadata, isBlogPostPage } = useBlogPost()
  const { tags, title, editUrl, hasTruncateMarker } = metadata

  // A post is truncated if it's in the "list view" and it has a truncate marker
  const truncatedPost = !isBlogPostPage && hasTruncateMarker

  const tagsExists = tags.length > 0

  const renderFooter = tagsExists || truncatedPost || editUrl

  if (!renderFooter) {
    return null
  }

  return (
    <footer
      className={clsx(
        'row docusaurus-mt-lg',
        isBlogPostPage && styles.blogPostFooterDetailsFull,
      )}
    >
      <div>{tagsExists && <TagsListInline tags={tags} />}</div>

      {isBlogPostPage && editUrl && (
        <div>
          <EditThisPage editUrl={editUrl} />
        </div>
      )}

      {truncatedPost && (
        <div className="read-more-link">
          <ReadMoreLink
            className={styles.readMoreLink}
            blogPostTitle={title}
            to={metadata.permalink}
          />
        </div>
      )}
    </footer>
  )
}
