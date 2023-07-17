import React from 'react'
import Translate, { translate } from '@docusaurus/Translate'
import { PageMetadata } from '@docusaurus/theme-common'
import Layout from '@theme/Layout'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { Button, Typography } from '@acid-info/lsd-react'
import Link from '@docusaurus/Link'

export default function NotFound(): JSX.Element {
  return (
    <>
      <PageMetadata
        title={translate({
          id: 'theme.NotFound.title',
          message: 'Page Not Found',
        })}
      />
      <Layout>
        <main className={clsx('container margin-vert--xl', styles.root)}>
          <div className="row">
            <div className="col col--6 col--offset-3">
              <Typography variant="h1">
                <Translate
                  id="theme.NotFound.title"
                  description="The title of the 404 page"
                >
                  Page Not Found
                </Translate>
              </Typography>
              <Typography variant="body1" component="p">
                <Translate
                  id="theme.NotFound.p1"
                  description="The first paragraph of the 404 page"
                >
                  We could not find what you were looking for.
                </Translate>
                <br />
                <Translate
                  id="theme.NotFound.p2"
                  description="The 2nd paragraph of the 404 page"
                >
                  Please contact the owner of the site that linked you to the
                  original URL and let them know their link is broken.
                </Translate>
              </Typography>
            </div>
            <Link to="/">
              <Button size="large" variant="outlined">
                <Translate
                  id="theme.NotFound.backToHome"
                  description="The label of the back to home link on the 404 page"
                >
                  Back to home
                </Translate>
              </Button>
            </Link>
          </div>
        </main>
      </Layout>
    </>
  )
}
