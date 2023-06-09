import { useWindowSize } from '@docusaurus/theme-common'
import { useDoc } from '@docusaurus/theme-common/internal'
import DocBreadcrumbs from '@theme/DocBreadcrumbs'
import DocItemContent from '@theme/DocItem/Content'
import DocItemFooter from '@theme/DocItem/Footer'
import DocItemPaginator from '@theme/DocItem/Paginator'
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop'
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile'
import DocVersionBadge from '@theme/DocVersionBadge'
import DocVersionBanner from '@theme/DocVersionBanner'
import { Props as HeadingProps } from '@theme/Heading'
import clsx from 'clsx'
import React from 'react'
import { useMedia } from 'react-use'
import { MDXEnhancementContext } from '../../../containers/MDXEnhacement/MDXEnhancement.context'
import styles from './styles.module.scss'

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
export function useDocTOC() {
  const { frontMatter, toc } = useDoc()
  const windowSize = useWindowSize()
  const isDesktop = useMedia('(min-width: 1200px)')
  const hidden = frontMatter.hide_table_of_contents
  const canRender = !hidden && toc.length > 0
  const mobile = canRender ? (
    <div className={styles.tocMobile}>
      <DocItemTOCMobile />
    </div>
  ) : undefined
  const desktop =
    canRender && (isDesktop || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined

  return {
    hidden,
    mobile,
    desktop,
  }
}

export default function DocItemLayout({ children }) {
  const docTOC = useDocTOC()

  return (
    <div className={clsx('row', styles.docItemGrid)}>
      <div className={clsx(styles.docItemCol)}>
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            <MDXEnhancementContext.Provider
              value={{
                items: [
                  {
                    component: 'heading',
                    position: 'after',
                    render: (props: HeadingProps) =>
                      props.as === 'h1' && docTOC.mobile,
                  },
                ],
              }}
            >
              <DocItemContent>{children}</DocItemContent>
            </MDXEnhancementContext.Provider>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      <div className={styles.gap1} />
      {docTOC.desktop && (
        <div className={clsx(styles.toc)}>{docTOC.desktop}</div>
      )}
    </div>
  )
}
