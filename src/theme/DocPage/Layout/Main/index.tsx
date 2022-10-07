import { useDocsSidebar } from '@docusaurus/theme-common/internal'
import type { Props } from '@theme/DocPage/Layout/Main'
import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.scss'

export default function DocPageLayoutMain({
  hiddenSidebarContainer,
  children,
}: Props): JSX.Element {
  const sidebar = useDocsSidebar()

  return (
    <main
      className={clsx(
        styles.docMainContainer,
        (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced,
      )}
    >
      <div className={styles.sidebarSpace} />
      <div
        className={clsx(
          'padding-top--md padding-bottom--lg',
          styles.docItemWrapper,
          hiddenSidebarContainer && styles.docItemWrapperEnhanced,
        )}
      >
        {children}
      </div>
    </main>
  )
}
