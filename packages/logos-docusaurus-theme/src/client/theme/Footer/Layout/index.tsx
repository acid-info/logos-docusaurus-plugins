import { Button } from '@acid-info/lsd-react'
import { MultiColumnFooter, SimpleFooter } from '@docusaurus/theme-common'
import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.scss'

const groupLinks = (
  links: MultiColumnFooter['links'] | SimpleFooter['links'],
) => {
  const siteLinks: any[] = []
  const sharedLinks: any[] = []

  for (const link of links) {
    if (
      'title' in link &&
      typeof link.title === 'string' &&
      link.title.startsWith('shared:')
    ) {
      sharedLinks.push({ ...link, title: link.title.slice(7) })
    } else siteLinks.push(link)
  }

  return [siteLinks, sharedLinks]
}

export default function FooterLayout({ style, links, logo, copyright }) {
  const [firstRow, secondRow] = groupLinks(links.props.links)

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark',
      })}
    >
      <div className={clsx('container', 'container-fluid', styles.firstRow)}>
        {(logo || copyright) && (
          <>
            <div className="footer__bottom text--center">
              {logo && <div className="margin-bottom--sm">{logo}</div>}
              {copyright}
            </div>
          </>
        )}
        {React.cloneElement(links, { links: firstRow })}
      </div>
      <div className={styles.secondRow}>
        <div className="footer__bottom text--center">Logos Collective</div>
        {React.cloneElement(links, { links: secondRow })}
      </div>
      <Button
        className={styles.backToTop}
        size="small"
        onClick={handleScrollToTop}
      >
        Back to top ↑
      </Button>
    </footer>
  )
}
