import { useActivePlugin } from '@docusaurus/plugin-content-docs/client'
import { useThemeConfig } from '@docusaurus/theme-common'
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal'
import { IconSearch } from '@logos-theme/components/Icon/index'
import { IconButton } from '@logos-theme/components/IconButton/index'
import {
  globalStore,
  selectHiddenSidebar,
} from '@logos-theme/containers/GlobalStore/index'
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle'
import NavbarLogo from '@theme/Navbar/Logo'
import NavbarSearch from '@theme/Navbar/Search'
import NavbarItem, { Props as NavbarItemConfig } from '@theme/NavbarItem'
import SearchBar from '@theme/SearchBar'
import clsx from 'clsx'
import React, { useState } from 'react'
import ChevronIcon from '../../../static/icons/chevron-left.svg'
import HamburgerIcon from '../../../static/icons/hamburger-menu.svg'
import { MobileSearch } from './MobileSearch/MobileSearch'
import { ShareButton } from './ShareButton'
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

const SidebarToggleButton: React.FC<{
  className: string
  onToggle: () => void
  shown: boolean
}> = ({ className, onToggle, shown }) => {
  return (
    <button
      onClick={onToggle}
      className={clsx(styles.sidebarButton, !shown && styles.expand, className)}
    >
      {shown ? <ChevronIcon /> : <HamburgerIcon />}
    </button>
  )
}

export default function NavbarContent(): JSX.Element {
  const navbarItems = useNavbarItems()
  const activePlugin = useActivePlugin()

  const localeDropdown = navbarItems.find(
    (item) => item.type === 'localeDropdown',
  )
  const docsVersionDropdowns = navbarItems.filter(
    (item) =>
      item.type === 'docsVersionDropdown' &&
      (!activePlugin?.pluginId || activePlugin.pluginId === item.docsPluginId),
  )
  const items = navbarItems.filter(
    (item) =>
      !item.type ||
      !['localeDropdown', 'version', 'docsVersionDropdown'].includes(
        item.type as string,
      ),
  )

  const mobileSidebar = useNavbarMobileSidebar()

  const dispatch = globalStore.useDispatch()
  const hiddenDesktopSidebar = globalStore.useSelector(selectHiddenSidebar)

  const [mobileSearch, setMobileSearch] = useState(false)

  return (
    <div
      className={clsx(
        'row',
        styles.root,
        mobileSearch && styles.activeMobileSearch,
      )}
    >
      <div className="col col--2">
        <SidebarToggleButton
          onToggle={mobileSidebar.toggle}
          shown={mobileSidebar.shown}
          className={styles.mobile}
        />
        <SidebarToggleButton
          onToggle={dispatch.toggleSidebar}
          shown={!hiddenDesktopSidebar}
          className={styles.desktop}
        />
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
          <div className={styles.searchContainer}>
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          </div>
        </div>
        <div>
          <nav className={clsx(styles.menu, styles.links)}>
            <NavbarItems items={items} />
          </nav>
        </div>
      </div>

      <div className={clsx('col col--4', styles.headerRight)}>
        <ShareButton />
        <NavbarColorModeToggle />
        {docsVersionDropdowns && <NavbarItems items={docsVersionDropdowns} />}
        {localeDropdown && (
          <>
            <div className={styles.divider} />
            <NavbarItem {...localeDropdown} />
          </>
        )}
      </div>

      <div
        className={clsx(
          'col',
          styles.headerRightMobile,
          mobileSearch && styles.shifted,
        )}
      >
        {localeDropdown && <NavbarItem {...localeDropdown} />}
        <IconButton
          className={styles.searchButton}
          onClick={() => setMobileSearch(true)}
        >
          <IconSearch />
        </IconButton>
      </div>

      <div
        className={clsx(
          styles.mobileSearchContainer,
          mobileSearch && styles.visible,
        )}
      >
        <MobileSearch
          render={mobileSearch}
          onCancel={() => setMobileSearch(false)}
        />
      </div>
    </div>
  )
}
