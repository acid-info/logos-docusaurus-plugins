import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal'
import { IconArrowLeftCircle } from '@logos-theme/components/Icon/index'
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle'
import NavbarLogo from '@theme/Navbar/Logo'
import React from 'react'

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar()
  return (
    <button
      type="button"
      className="clean-btn navbar-sidebar__close"
      onClick={() => mobileSidebar.toggle()}
    >
      <IconArrowLeftCircle />
    </button>
  )
}

export default function NavbarMobileSidebarHeader(): JSX.Element {
  return (
    <div className="navbar-sidebar__brand">
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <CloseButton />
        <NavbarLogo />
      </div>
      <NavbarColorModeToggle className="margin-right--md" />
    </div>
  )
}
