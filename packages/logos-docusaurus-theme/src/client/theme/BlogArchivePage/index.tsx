import BlogArchivePage from '@docusaurus/theme-classic/lib/theme/BlogArchivePage'
import type { WrapperProps } from '@docusaurus/types'
import type BlogArchivePageType from '@theme/BlogArchivePage'
import React, { ReactElement } from 'react'

type Props = WrapperProps<typeof BlogArchivePageType>

export default function BlogArchivePageWrapper(props: Props): ReactElement {
  return (
    <div className="blog-archive-page">
      <BlogArchivePage {...props} />
    </div>
  )
}
