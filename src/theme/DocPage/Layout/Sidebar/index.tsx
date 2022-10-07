import { useLocation } from '@docusaurus/router'
import { ThemeClassNames } from '@docusaurus/theme-common'
import { useDocsSidebar } from '@docusaurus/theme-common/internal'
import {
  globalStore,
  selectHiddenSidebar,
} from '@site/src/containers/GlobalStore'
import type { Props } from '@theme/DocPage/Layout/Sidebar'
import DocSidebar from '@theme/DocSidebar'
import clsx from 'clsx'
import React, { ReactNode } from 'react'
import styles from './styles.module.css'

// Reset sidebar state when sidebar changes
// Use React key to unmount/remount the children
// See https://github.com/facebook/docusaurus/issues/3414
function ResetOnSidebarChange({ children }: { children: ReactNode }) {
  const sidebar = useDocsSidebar()
  return (
    <React.Fragment key={sidebar?.name ?? 'noSidebar'}>
      {children}
    </React.Fragment>
  )
}

export default function DocPageLayoutSidebar({ sidebar }: Props): JSX.Element {
  const { pathname } = useLocation()
  const dispatch = globalStore.useDispatch()
  const hiddenSidebar = globalStore.useSelector(selectHiddenSidebar)

  return (
    <aside
      className={clsx(
        ThemeClassNames.docs.docSidebarContainer,
        styles.docSidebarContainer,
        hiddenSidebar && styles.docSidebarContainerHidden,
      )}
      onTransitionEnd={(e) => {
        if (!e.currentTarget.classList.contains(styles.docSidebarContainer!)) {
          return
        }
      }}
    >
      <ResetOnSidebarChange>
        <DocSidebar
          sidebar={sidebar}
          path={pathname}
          onCollapse={() => dispatch.setHiddenSidebar(true)}
          isHidden={hiddenSidebar}
        />
      </ResetOnSidebarChange>
    </aside>
  )
}
