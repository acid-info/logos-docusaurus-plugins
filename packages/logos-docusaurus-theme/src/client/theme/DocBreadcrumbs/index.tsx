import React from 'react'
import clsx from 'clsx'
import { ThemeClassNames } from '@docusaurus/theme-common'
import {
  useSidebarBreadcrumbs,
  useHomePageRoute,
} from '@docusaurus/theme-common/internal'
import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import styles from './styles.module.css'
import { Typography } from '@acid-info/lsd-react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

// TODO move to design system folder
function BreadcrumbsItemLink({ children, href, isLast }) {
  const className = 'breadcrumbs__link'
  if (isLast) {
    return (
      <Typography
        variant="body3"
        component="span"
        className={className}
        itemProp="name"
      >
        {children}
      </Typography>
    )
  }
  return href ? (
    <Link className={className} href={href} itemProp="item">
      <Typography variant="body3" component="span" itemProp="name">
        {children}
      </Typography>
    </Link>
  ) : (
    // TODO Google search console doesn't like breadcrumb items without href.
    // The schema doesn't seem to require `id` for each `item`, although Google
    // insist to infer one, even if it's invalid. Removing `itemProp="item
    // name"` for now, since I don't know how to properly fix it.
    // See https://github.com/facebook/docusaurus/issues/7241
    <Typography variant="body3" component="span" className={className}>
      {children}
    </Typography>
  )
}

// TODO move to design system folder
function BreadcrumbsItem({ children, active, index, addMicrodata }) {
  return (
    <li
      {...(addMicrodata && {
        itemScope: true,
        itemProp: 'itemListElement',
        itemType: 'https://schema.org/ListItem',
      })}
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active,
      })}
    >
      {children}
      <meta itemProp="position" content={String(index + 1)} />
    </li>
  )
}

export default function DocBreadcrumbs() {
  const breadcrumbs = useSidebarBreadcrumbs()
  const homePageRoute = useHomePageRoute()
  const { siteConfig } = useDocusaurusContext()

  if (!breadcrumbs) {
    return null
  }

  //@ts-ignore
  const routeBasePath = siteConfig.presets[0][1].docs.routeBasePath

  return (
    <nav
      className={clsx(
        ThemeClassNames.docs.docBreadcrumbs,
        styles.breadcrumbsContainer,
      )}
      aria-label={translate({
        id: 'theme.docs.breadcrumbs.navAriaLabel',
        message: 'Breadcrumbs',
        description: 'The ARIA label for the breadcrumbs',
      })}
    >
      <ul
        className="breadcrumbs"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {homePageRoute && (
          <Typography
            className={clsx('breadcrumbs__item')}
            variant="body3"
            component="a"
            href={routeBasePath}
          >
            Home
          </Typography>
        )}
        {breadcrumbs.map((item, idx) => {
          const isLast = idx === breadcrumbs.length - 1
          return (
            <BreadcrumbsItem
              key={idx}
              active={isLast}
              index={idx}
              addMicrodata={!!item.href}
            >
              <BreadcrumbsItemLink href={item.href} isLast={isLast}>
                {item.label}
              </BreadcrumbsItemLink>
            </BreadcrumbsItem>
          )
        })}
      </ul>
    </nav>
  )
}
