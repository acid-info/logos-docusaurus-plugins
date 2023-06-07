import React from 'react'
import clsx from 'clsx'
import { useNavbarSecondaryMenu } from '@docusaurus/theme-common/internal'
import Footer from '@theme/Footer'

export default function NavbarMobileSidebarLayout({
  header,
  primaryMenu,
  secondaryMenu,
}) {
  const { shown: secondaryMenuShown } = useNavbarSecondaryMenu()

  return (
    <div
      className={clsx(
        'navbar-sidebar',
        secondaryMenuShown && 'navbar-sidebar--show-secondary',
      )}
    >
      {header}
      <div
        className={clsx('navbar-sidebar__items', {
          'navbar-sidebar__items--show-secondary': secondaryMenuShown,
        })}
      >
        <div className="navbar-sidebar__item menu">
          {primaryMenu}
          {!secondaryMenuShown && <Footer />}
        </div>
        <div className="navbar-sidebar__item menu">{secondaryMenu}</div>
      </div>
    </div>
  )
}
