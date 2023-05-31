import { ErrorCauseBoundary, useThemeConfig } from '@docusaurus/theme-common'
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal'
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle'
import NavbarLogo from '@theme/Navbar/Logo'
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle'
import NavbarSearch from '@theme/Navbar/Search'
import NavbarItem from '@theme/NavbarItem'
import SearchBar from '@theme/SearchBar'
import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.css'

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
  const mobileSidebar = useNavbarMobileSidebar()
  const items = useNavbarItems()
  const [leftItems, rightItems] = splitNavbarItems(items)
  const searchBarItem = items.find((item) => item.type === 'search')

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
        <NavbarColorModeToggle
          className={clsx(styles.colorModeToggle, 'navbar__color-mode-toggle')}
        />
        {!searchBarItem && (
          <NavbarSearch>
            <SearchBar />
          </NavbarSearch>
        )}
        {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
      </div>
    </div>
  )
}
