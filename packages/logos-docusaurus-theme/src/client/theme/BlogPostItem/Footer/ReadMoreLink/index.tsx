import React, { ReactElement } from 'react'
import Translate, { translate } from '@docusaurus/Translate'
import Link from '@docusaurus/Link'
import type { Props } from '@theme/BlogPostItem/Footer/ReadMoreLink'
import { Button, Typography } from '@acid-info/lsd-react'

function ReadMoreLabel() {
  return (
    <Translate
      id="theme.blog.post.readMore"
      description="The label used in blog post item excerpts to link to full blog posts"
    >
      Read More
    </Translate>
  )
}

export default function BlogPostItemFooterReadMoreLink(
  props: Props,
): ReactElement {
  const { blogPostTitle, ...linkProps } = props
  return (
    <Link
      aria-label={translate(
        {
          message: 'Read more about {title}',
          id: 'theme.blog.post.readMoreLabel',
          description:
            'The ARIA label for the link to full blog posts from excerpts',
        },
        { title: blogPostTitle },
      )}
      {...linkProps}
    >
      <Button size="medium" variant="filled">
        <Typography variant="label1" component="span">
          <ReadMoreLabel />
        </Typography>
      </Button>
    </Link>
  )
}
