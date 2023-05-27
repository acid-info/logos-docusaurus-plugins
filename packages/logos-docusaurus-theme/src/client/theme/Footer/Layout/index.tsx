import React from 'react'
import clsx from 'clsx'
import { Grid, GridItem } from '@logos-theme/components/Grid/Grid'
import { Typography } from '@acid-info/lsd-react'
import styles from './style.module.css'
import styled from '@emotion/styled'

export default function FooterLayout({ style, copyright }) {
  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark',
      })}
    >
      <CustomGrid>
        <GridItem className={clsx('w-6', styles.footerInfo)}>
          <Typography component="div" variant="body2">
            Copyright © 2023 Logos
          </Typography>
          <Typography component="div" variant="body2">
            Built with Docusaurus.
          </Typography>
        </GridItem>
        <GridItem className={clsx('w-1', 'desktop')} />
        <GridItem className="w-6">
          <div className={styles.section}>
            <div>
              <Typography component="div" variant="body2">
                Learn
              </Typography>
              <div className={styles.flexRow}>
                <Typography component="a" href="/" variant="body2">
                  Introduction
                </Typography>
                <Typography component="a" href="/" variant="body2">
                  Installation
                </Typography>
                <Typography component="a" href="/" variant="body2">
                  Migrate from v1 to v2
                </Typography>
              </div>
            </div>
            <div>
              <Typography component="div" variant="body2">
                Community
              </Typography>
              <div className={styles.flexRow}>
                <Typography component="a" href="/" variant="body2">
                  Stack Overflow
                </Typography>
                <Typography component="a" href="/" variant="body2">
                  Feature Requests
                </Typography>
                <Typography component="a" href="/" variant="body2">
                  Discord
                </Typography>
                <Typography component="a" href="/" variant="body2">
                  Help
                </Typography>
              </div>
            </div>
          </div>
        </GridItem>
        <GridItem className="w-1" />
        <GridItem className="w-6">
          <div className={styles.section}>
            <div>
              <Typography component="div" variant="body2">
                More
              </Typography>
              <div className={styles.flexRow}>
                <Typography component="a" href="/" variant="body2">
                  Blog
                </Typography>
                <Typography component="a" href="/" variant="body2">
                  Changelog
                </Typography>
                <Typography component="a" href="/" variant="body2">
                  Github
                </Typography>
                <Typography component="a" href="/" variant="body2">
                  Twitter
                </Typography>
              </div>
            </div>
            <div>
              <Typography component="div" variant="body2">
                Legal
              </Typography>
              <div className={styles.flexRow}>
                <Typography component="a" href="/" variant="body2">
                  Privacy
                </Typography>
                <Typography component="a" href="/" variant="body2">
                  Terms
                </Typography>
                <Typography component="a" href="/" variant="body2">
                  Data policy
                </Typography>
                <Typography component="a" href="/" variant="body2">
                  Cookie policy
                </Typography>
              </div>
            </div>
          </div>
        </GridItem>
        <GridItem className="w-4" />
      </CustomGrid>
    </footer>
  )
}

const CustomGrid = styled(Grid)`
  @media (max-width: 997px) {
    grid-template-columns: 1fr;
  }
`
