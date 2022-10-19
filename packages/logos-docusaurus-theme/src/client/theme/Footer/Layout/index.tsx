import type { Props } from '@theme/Footer/Layout'
import clsx from 'clsx'
import React from 'react'
import { useThemeConfig } from '@docusaurus/theme-common'
import { FooterLinkItem } from '@docusaurus/theme-common/internal'
import { ThemeConfig } from '@docusaurus/types'
import { SocialMediaItem } from '@logos-theme/components/Icon/SocialmediaLink'
import {
  globalStore,
  selectHiddenSidebar,
} from '@logos-theme/containers/GlobalStore/index'
import { ECommunityProviders } from '@logos-theme/types/ui.types'
import { DeepRequired } from 'utility-types'
import styles from './style.module.scss'

export default function FooterLayout(props: Props): JSX.Element {
  const { logo, copyright } = props
  const {
    footer: { links = [] },
  } = useThemeConfig() as ThemeConfig & {
    footer: ThemeConfig['footer'] & { links: FooterLinkItem[] }
  }
  const hiddenSidebar = globalStore.useSelector(selectHiddenSidebar)

  const communityLinks = links
    .filter((l) => l && l.title === 'Community')
    .flatMap((l) =>
      (l as any).items.filter((item: FooterLinkItem) => !!item.href),
    )

  return (
    <footer className={clsx('footer', styles.footer)}>
      <div
        className={clsx(
          'row',
          'col',
          'col--8',
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
              {(communityLinks as DeepRequired<FooterLinkItem>[]).map(
                (link, i) => (
                  <SocialMediaItem
                    key={i}
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
