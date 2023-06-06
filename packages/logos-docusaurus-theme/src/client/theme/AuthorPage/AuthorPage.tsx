import { Typography } from '@acid-info/lsd-react'
import Link from '@docusaurus/Link'
import formatDate from 'date-fns/format'
import React from 'react'
import { Author } from '../../types/theme.types'
import styles from './AuthorPage.module.scss'

export type AuthorPageProps = {
  data: {
    author: Author
    docs: {
      id: string
      title: string
      description: string
      permalink: string
      frontMatter: {
        date?: string
      }
    }[]
  }
}

export const AuthorPage: React.FC<AuthorPageProps> = ({
  data: { author, docs },
}) => {
  return (
    <div className={styles.root}>
      <Typography className={styles.name} variant="h3">
        {author.name}
      </Typography>
      <div className={styles.links}>
        {author.github && (
          <Typography
            variant="body2"
            component="a"
            target="_blank"
            href={`https://github.com/${author.github}`}
          >
            Github
          </Typography>
        )}
        {author.twitter && (
          <Typography
            variant="body2"
            component="a"
            target="_blank"
            href={`https://twitter.com/${author.twitter}`}
          >
            Twitter
          </Typography>
        )}
        {author.website && (
          <Typography
            variant="body2"
            component="a"
            target="_blank"
            href={author.website}
          >
            Website
          </Typography>
        )}
      </div>
      <div className={styles.docs}>
        {docs.map((doc, index) => (
          <div className={styles.doc} key={index}>
            {doc.frontMatter.date && (
              <Typography
                className={styles.date}
                variant="body2"
                component="div"
              >
                {formatDate(new Date(doc.frontMatter.date), 'MMM d yyyy')}
              </Typography>
            )}
            <Link className={styles.title} href={doc.permalink}>
              {doc.title}
            </Link>
            <Typography className={styles.description} variant="body1">
              {doc.description}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AuthorPage
