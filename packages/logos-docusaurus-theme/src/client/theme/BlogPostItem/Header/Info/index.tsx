import { usePluralForm } from '@docusaurus/theme-common'
import { useBlogPost } from '@docusaurus/theme-common/internal'
import { translate } from '@docusaurus/Translate'
import type { Props } from '@theme/BlogPostItem/Header/Info'
import clsx from 'clsx'
import React from 'react'
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors'

import styles from './styles.module.scss'

// Very simple pluralization: probably good enough for now
function useReadingTimePlural() {
  const { selectMessage } = usePluralForm()
  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat)
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        { readingTime },
      ),
    )
  }
}

function ReadingTime({ readingTime }: { readingTime: number }) {
  const readingTimePlural = useReadingTimePlural()
  return <div>{readingTimePlural(readingTime)}</div>
}

function Date({
  date,
  formattedDate,
}: {
  date: string
  formattedDate: string
}) {
  return (
    <time dateTime={date} itemProp="datePublished">
      {formattedDate}
    </time>
  )
}

export default function BlogPostItemHeaderInfo({
  className,
}: Props): JSX.Element {
  const { metadata, isBlogPostPage } = useBlogPost()
  const { date, formattedDate, readingTime } = metadata

  return (
    <div
      className={clsx(
        styles.container,
        'margin-vert--md',
        !isBlogPostPage && styles.blogContainer,
        className,
      )}
    >
      <Date date={date} formattedDate={formattedDate} />
      <BlogPostItemHeaderAuthors className={styles.authors} />
      {typeof readingTime !== 'undefined' && (
        <>
          <ReadingTime readingTime={readingTime} />
        </>
      )}
    </div>
  )
}
