import { ArrowDownIcon, Dropdown, Typography } from '@acid-info/lsd-react'
import {
  Collapsible,
  isRegexpStringMatch,
  useCollapsible,
} from '@docusaurus/theme-common'
import { isSamePath, useLocalPathname } from '@docusaurus/theme-common/internal'
import NavbarItem from '@theme/NavbarItem'
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

function isItemActive(item, localPathname) {
  if (isSamePath(item.to, localPathname)) {
    return true
  }
  if (isRegexpStringMatch(item.activeBaseRegex, localPathname)) {
    return true
  }
  if (item.activeBasePath && localPathname.startsWith(item.activeBasePath)) {
    return true
  }
  return false
}

function containsActiveItems(items, localPathname) {
  return items.some((item) => isItemActive(item, localPathname))
}

function DropdownNavbarItemDesktop({
  items,
  position,
  className,
  onClick,
  ...props
}) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current || dropdownRef.current.contains(event.target)) {
        return
      }
      setShowDropdown(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    document.addEventListener('focusin', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('focusin', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <div
      ref={dropdownRef}
      className={clsx(
        'navbar__item',
        styles.dropdownNavbarItem,
        'dropdown',
        'dropdown--hoverable',
        {
          'dropdown--right': position === 'right',
          'dropdown--show': showDropdown,
        },
      )}
    >
      <NavbarNavLink
        aria-haspopup="true"
        aria-expanded={showDropdown}
        role="button"
        href={props.to ? undefined : '#'}
        className={clsx('navbar__link', className)}
        {...props}
        onClick={props.to ? undefined : (e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            setShowDropdown(!showDropdown)
          }
        }}
      >
        {props.children ?? props.label}
      </NavbarNavLink>
      <ArrowDownIcon className={clsx('margin-left-8', 'cursor-pointer')} />
      <ul className="dropdown__menu">
        {items.map((childItemProps, i) => (
          <NavbarItem
            isDropdownItem
            activeClassName="dropdown__link--active"
            {...childItemProps}
            key={i}
          />
        ))}
      </ul>
    </div>
  )
}

function DropdownNavbarItemMobile({
  items,
  className,
  position, // Need to destructure position from props so that it doesn't get passed on.
  onClick,
  ...props
}) {
  const localPathname = useLocalPathname()
  const containsActive = containsActiveItems(items, localPathname)
  const { collapsed, toggleCollapsed, setCollapsed } = useCollapsible({
    initialState: () => !containsActive,
  })

  // Expand/collapse if any item active after a navigation
  useEffect(() => {
    if (containsActive) {
      setCollapsed(!containsActive)
    }
  }, [localPathname, containsActive, setCollapsed])
  return (
    <li
      className={clsx('menu__list-item', {
        'menu__list-item--collapsed': collapsed,
      })}
    >
      <NavbarNavLink
        role="button"
        className={clsx(
          'menu__link menu__link--sublist menu__link--sublist-caret',
          className,
        )}
        {...props}
        onClick={(e) => {
          e.preventDefault()
          toggleCollapsed()
        }}
      >
        <Typography variant="body1">{props.children ?? props.label}</Typography>
      </NavbarNavLink>
      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        {items.map((childItemProps, i) => (
          <NavbarItem
            mobile
            isDropdownItem
            onClick={onClick}
            activeClassName="menu__link--active"
            {...childItemProps}
            key={i}
          />
        ))}
      </Collapsible>
    </li>
  )
}
export default function DropdownNavbarItem({ mobile = false, ...props }) {
  const Comp = mobile ? DropdownNavbarItemMobile : DropdownNavbarItemDesktop

  //@ts-ignore
  return <Comp {...props} />
}
