import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal'
import type { WrapperProps } from '@docusaurus/types'
import Navbar from '@theme-original/Navbar'
import type NavbarType from '@theme/Navbar'
import React, { useEffect } from 'react'
import './index.scss'

type Props = WrapperProps<typeof NavbarType>

export default function NavbarWrapper(props: Props): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar()

  useEffect(() => {
    if (mobileSidebar.shown) {
      document
        .querySelector('#__docusaurus')
        ?.classList?.add?.('overflow-hidden')
    } else {
      document
        .querySelector('#__docusaurus')
        ?.classList?.remove?.('overflow-hidden')
    }
  }, [mobileSidebar.shown])

  return (
    <>
      <Navbar {...props} />
    </>
  )
}
