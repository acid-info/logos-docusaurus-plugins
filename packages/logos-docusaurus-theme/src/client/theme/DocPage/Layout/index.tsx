import React, { useState } from 'react'
import { useDocsSidebar } from '@docusaurus/theme-common/internal'
import Layout from '@theme/Layout'
import BackToTopButton from '@theme/BackToTopButton'
import DocPageLayoutSidebar from '@theme/DocPage/Layout/Sidebar'
import DocPageLayoutMain from '@theme/DocPage/Layout/Main'
import styles from './styles.module.css'
import { Grid, GridItem } from '@logos-theme/components/Grid/Grid'
import clsx from 'clsx'

export default function DocPageLayout({ children }) {
  const sidebar = useDocsSidebar()
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false)
  return (
    <Layout wrapperClassName={styles.docsWrapper}>
      <BackToTopButton />
      <Grid>
        <GridItem className={clsx('w-3', 'desktop')} />
        {sidebar && (
          <DocPageLayoutSidebar
            sidebar={sidebar.items}
            hiddenSidebarContainer={hiddenSidebarContainer}
            setHiddenSidebarContainer={setHiddenSidebarContainer}
          />
        )}
        <GridItem className={clsx('w-1', 'desktop')} />
        <DocPageLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
          {children}
        </DocPageLayoutMain>
        <GridItem className={clsx('w-3', 'desktop')} />
      </Grid>
    </Layout>
  )
}
