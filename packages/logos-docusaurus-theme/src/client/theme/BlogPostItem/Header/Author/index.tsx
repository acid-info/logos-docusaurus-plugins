import React, { ReactElement } from 'react'
import clsx from 'clsx'
import Link, { type Props as LinkProps } from '@docusaurus/Link'

import { Typography } from '@acid-info/lsd-react'

function MaybeLink(props: LinkProps): ReactElement {
  if (props.href) {
    return <Link {...props} />
  }
  return <>{props.children}</>
}

export default function BlogPostItemHeaderAuthor({
  author,
  className,
}): ReactElement {
  const { name, title, url, imageURL, email } = author
  const link = url || (email && `mailto:${email}`) || undefined
  return (
    <div className={clsx('avatar margin-bottom--sm', className)}>
      {name && (
        <div
          className="avatar__intro"
          itemProp="author"
          itemScope
          itemType="https://schema.org/Person"
        >
          <div className="avatar__name">
            <MaybeLink href={link} itemProp="url">
              <Typography variant="body2" itemProp="name">
                {name}
              </Typography>
            </MaybeLink>
          </div>
        </div>
      )}
    </div>
  )
}
