import React, { useState } from 'react'
import { useDocsSidebar } from '@docusaurus/theme-common/internal'
import Layout from '@theme/Layout'
import BackToTopButton from '@theme/BackToTopButton'
import DocPageLayoutSidebar from '@theme/DocPage/Layout/Sidebar'
import DocPageLayoutMain from '@theme/DocPage/Layout/Main'
import styles from './styles.module.css'
import { Grid, GridItem } from '@logos-theme/components/Grid/Grid'

export default function DocPageLayout({ children }) {
  const sidebar = useDocsSidebar()
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false)
  return (
    <Layout wrapperClassName={styles.docsWrapper}>
      <BackToTopButton />
      <Grid>
        <GridItem className="w-3" />
        {sidebar && (
          <DocPageLayoutSidebar
            sidebar={sidebar.items}
            hiddenSidebarContainer={hiddenSidebarContainer}
            setHiddenSidebarContainer={setHiddenSidebarContainer}
          />
        )}
        <GridItem className="w-1" />
        <DocPageLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
          {children}
        </DocPageLayoutMain>
        <GridItem className="w-3" />
      </Grid>
    </Layout>
  )
}
