import React from 'react'
import clsx from 'clsx'
import { ThemeClassNames } from '@docusaurus/theme-common'
import Heading from '@theme/Heading'
import MDXContent from '@theme/MDXContent'
import MDXHeading from '@theme/MDXComponents/Heading'
import { useDoc } from '@docusaurus/plugin-content-docs/lib/client/doc.js'
/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc()
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined'
  if (!shouldRender) {
    return null
  }
  return metadata.title
}
export default function DocItemContent({ children }) {
  const syntheticTitle = useSyntheticTitle()
  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <MDXHeading as="h1">{syntheticTitle}</MDXHeading>
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  )
}
