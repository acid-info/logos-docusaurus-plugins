import { useThemeConfig } from '@docusaurus/theme-common'
import { useNavbarSecondaryMenu } from '@docusaurus/theme-common/internal'
import Translate from '@docusaurus/Translate'
import { ButtonWithIcon } from '@logos-theme/components/Button/ButtonWithIcon'
import { IconArrowLeftCircle } from '@logos-theme/components/Icon/index'
import React, { type ComponentProps } from 'react'
import styles from './styles.module.scss'

function SecondaryMenuBackButton(props: ComponentProps<'button'>) {
  return (
    <ButtonWithIcon
      className={styles.backButton}
      icon={<IconArrowLeftCircle></IconArrowLeftCircle>}
      {...props}
    >
      <Translate
        id="theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel"
        description="The label of the back button to return to main menu, inside the mobile navbar sidebar secondary menu (notably used to display the docs sidebar)"
      >
        Main Menu
      </Translate>
    </ButtonWithIcon>
  )
}

// The secondary menu slides from the right and shows contextual information
// such as the docs sidebar
export default function NavbarMobileSidebarSecondaryMenu(): JSX.Element | null {
  const isPrimaryMenuEmpty = useThemeConfig().navbar.items.length === 0
  const secondaryMenu = useNavbarSecondaryMenu()
  return (
    <>
      {/* edge-case: prevent returning to the primaryMenu when it's empty */}
      {!isPrimaryMenuEmpty && (
        <SecondaryMenuBackButton onClick={() => secondaryMenu.hide()} />
      )}
      {secondaryMenu.content}
    </>
  )
}
