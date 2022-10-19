import { useThemeConfig } from '@docusaurus/theme-common'
import type { Props } from '@theme/DocSidebar/Desktop'
import Content from '@theme/DocSidebar/Desktop/Content'
import Logo from '@theme/Logo'
import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.css'

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: Props) {
  const {
    navbar: { hideOnScroll },
    docs: {},
  } = useThemeConfig()

  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden,
      )}
    >
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      <Content path={path} sidebar={sidebar} />
    </div>
  )
}

export default React.memo(DocSidebarDesktop)
