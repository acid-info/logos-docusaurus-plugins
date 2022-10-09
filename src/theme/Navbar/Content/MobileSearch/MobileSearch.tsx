import NavbarLogo from '@theme/Navbar/Logo'
import clsx from 'clsx'
import React, { useState } from 'react'
import { useDebounce } from 'react-use'
import { SearchBar } from '../../../SearchBar/SearchBar'
import styles from './MobileSearch.module.scss'

export const MobileSearch: React.FC<{
  render: boolean
  onCancel: () => void
}> = ({ render, onCancel }) => {
  const [renderSearchBar, setRenderSearchBar] = useState(false)
  useDebounce(() => setRenderSearchBar(render), render ? 0 : 1000, [render])

  return (
    <div className={clsx(styles.root)}>
      <div>
        <NavbarLogo />
      </div>
      <div>{renderSearchBar && <SearchBar />}</div>
      <div>
        <button className={clsx('clean-btn')} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}
