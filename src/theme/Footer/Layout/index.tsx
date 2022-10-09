import React from 'react'
import clsx from 'clsx'
import type { Props } from '@theme/Footer/Layout'

import styles from './style.module.scss'
import { useThemeConfig } from '@docusaurus/theme-common'
import { SocialMediaItem } from '@site/src/components/Icon/SocialmediaLink'
import {
  globalStore,
  selectHiddenSidebar,
} from '@site/src/containers/GlobalStore'
import { FooterLinkItem } from '@docusaurus/theme-common/src/utils/useThemeConfig'
import { ECommunityProviders } from '@site/src/types/ui.types'

export default function FooterLayout(props: Props): JSX.Element {
  const { logo, copyright } = props
  const {
    footer: { links = [] },
  } = useThemeConfig()
  const hiddenSidebar = globalStore.useSelector(selectHiddenSidebar)

  //TODO why?
  //ts-ignore
  const communityLinks = (links as FooterLinkItem[])
    .filter((l) => l && l.title === 'Community')
    .flatMap((l) => l.items)

  return (
    <footer className={clsx('footer', styles.footer)}>
      <div
        className={clsx(
          'row',
          'col',
          'col--7',
          styles.footerContentWrapper,
          hiddenSidebar ? styles.withSidebarHide : '',
        )}
      >
        <div
          className={clsx(
            styles.sidebarSpace,
            hiddenSidebar && styles.collapsed,
          )}
        ></div>
        <div className={styles.footerContent}>
          {(logo || copyright) && (
            <div className={styles.lockup}>
              {logo && <div className={styles.footerLogoWrapper}>{logo}</div>}
              <span className={'sub5'}>{copyright}</span>
            </div>
          )}
          <div className={styles.communityLinksWrapper}>
            <div className={styles.communityLinks}>
              {communityLinks.map(
                (link: FooterLinkItem, i) =>
                  link.href && (
                    <SocialMediaItem
                      handler={link.href}
                      provider={link.label.toLowerCase() as ECommunityProviders}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
