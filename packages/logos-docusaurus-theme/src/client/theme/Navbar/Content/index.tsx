import { IconButtonGroup } from '@acid-info/lsd-react'
import { ErrorCauseBoundary, useThemeConfig } from '@docusaurus/theme-common'
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal'
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle'
import NavbarLogo from '@theme/Navbar/Logo'
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle'
import NavbarItem from '@theme/NavbarItem'
import SearchBar from '@theme/SearchBar'
import clsx from 'clsx'
import React from 'react'
import { useHydrated } from '../../../lib/useHydrated'
import styles from './styles.module.scss'

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items
}

function NavbarItems({ items }) {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              //@ts-ignore
              { cause: error },
            )
          }
        >
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  )
}

export default function NavbarContent() {
  const hydrated = useHydrated()
  const mobileSidebar = useNavbarMobileSidebar()
  const allItems = useNavbarItems()
  const [leftItems, rightItems] = splitNavbarItems(
    allItems.filter((item) => !['search'].includes(item.type ?? '')),
  )
  const searchBarItem = allItems.find((item) => item.type === 'search')

  return (
    <div className="navbar__inner">
      <div className="navbar__left">
        <NavbarLogo />
      </div>
      <div className="navbar__left-items">
        <NavbarItems items={leftItems} />
      </div>
      <div className="navbar__right-items">
        <NavbarItems items={rightItems} />

        <IconButtonGroup className={styles.iconButtonGroup} size="medium">
          <NavbarColorModeToggle
            key="color-toggle"
            className={clsx(
              styles.colorModeToggle,
              'navbar__color-mode-toggle',
            )}
          />
          {hydrated && (
            <React.Fragment key="search">
              {searchBarItem && <SearchBar />}
            </React.Fragment>
          )}
          <React.Fragment key="mobile-sidebar-toggle">
            {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          </React.Fragment>
        </IconButtonGroup>
      </div>
    </div>
  )
}
