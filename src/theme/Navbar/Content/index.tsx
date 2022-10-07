import { useThemeConfig } from '@docusaurus/theme-common'
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal'
import {
  globalStore,
  selectHiddenSidebar,
} from '@site/src/containers/GlobalStore'
import ChevronIcon from '@site/static/icons/chevron-left.svg'
import HamburgerIcon from '@site/static/icons/hamburger-menu.svg'
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle'
import NavbarLogo from '@theme/Navbar/Logo'
import NavbarSearch from '@theme/Navbar/Search'
import NavbarItem, { Props as NavbarItemConfig } from '@theme/NavbarItem'
import SearchBar from '@theme/SearchBar'
import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.scss'

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as NavbarItemConfig[]
}

function NavbarItems({ items }: { items: NavbarItemConfig[] }): JSX.Element {
  return (
    <>
      {items.map((item, i) => (
        <NavbarItem {...item} key={i} />
      ))}
    </>
  )
}

export default function NavbarContent(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar()

  const items = useNavbarItems()

  const dispatch = globalStore.useDispatch()
  const hiddenDesktopSidebar = globalStore.useSelector(selectHiddenSidebar)

  const localeDropdown = items.find((item) => item.type === 'localeDropdown')
  const links = items.filter(
    (item) => item.type === 'doc' || !!(item as any).to,
  )

  return (
    <div className={clsx('row', styles.root)}>
      <div className="col col--2">
        <button
          onClick={dispatch.toggleSidebar}
          className={styles.sidebarButton}
        >
          {!hiddenDesktopSidebar ? <ChevronIcon /> : <HamburgerIcon />}
        </button>
      </div>

      <div className={clsx('col', styles.headerMiddle)}>
        <div
          className={clsx(
            styles.menu,
            styles.leftContainer,
            hiddenDesktopSidebar && styles.shifted,
          )}
        >
          <div className={styles.navbarLogoWrapper}>
            <NavbarLogo />
          </div>
          <div>
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          </div>
        </div>
        <div>
          <nav className={styles.menu}>
            <NavbarItems items={links} />
          </nav>
        </div>
      </div>

      <div className={clsx('col col--5', styles.headerRight)}>
        <NavbarColorModeToggle />
        {localeDropdown && (
          <>
            <div className={styles.divider} />
            <NavbarItem {...localeDropdown} />
          </>
        )}
      </div>
    </div>
  )
}
