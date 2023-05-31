import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'

export default function FooterLayout({ style, links, logo, copyright }) {
  const firstRow = [...links.props.links.slice(0, 2)]
  const secondRow = [...links.props.links.slice(2)]

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
    </footer>
  )
}
