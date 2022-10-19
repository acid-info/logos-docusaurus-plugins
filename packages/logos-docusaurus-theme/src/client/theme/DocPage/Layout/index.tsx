import { useDocsSidebar } from '@docusaurus/theme-common/internal'
import {
  globalStore,
  selectHiddenSidebar,
} from '@logos-theme/containers/GlobalStore/index'
import BackToTopButton from '@theme/BackToTopButton'
import type { Props } from '@theme/DocPage/Layout'
import DocPageLayoutMain from '@theme/DocPage/Layout/Main'
import DocPageLayoutSidebar from '@theme/DocPage/Layout/Sidebar'
import Layout from '@theme/Layout'
import React from 'react'
import styles from './styles.module.scss'

const DocPageWrapper: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const sidebar = useDocsSidebar()

  const dispatch = globalStore.useDispatch()
  const hiddenSidebarContainer = globalStore.useSelector(selectHiddenSidebar)
  const setHiddenSidebarContainer = dispatch.setHiddenSidebar

  return (
    <div className={styles.docPage}>
      {sidebar && (
        <DocPageLayoutSidebar
          sidebar={sidebar.items}
          hiddenSidebarContainer={hiddenSidebarContainer}
          setHiddenSidebarContainer={setHiddenSidebarContainer}
        />
      )}
      <DocPageLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
        {children}
      </DocPageLayoutMain>
    </div>
  )
}

export default function DocPageLayout({ children }: Props): JSX.Element {
  return (
    <Layout wrapperClassName={styles.docsWrapper}>
      <BackToTopButton />
      <DocPageWrapper>{children}</DocPageWrapper>
    </Layout>
  )
}
