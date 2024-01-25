import { Typography } from '@acid-info/lsd-react'
import Link from '@docusaurus/Link'
import { PropSidebarBreadcrumbsItem } from '@docusaurus/plugin-content-docs'
import { useActivePlugin } from '@docusaurus/plugin-content-docs/lib/client/index.js'
import { ThemeClassNames } from '@docusaurus/theme-common'
import {
  useHomePageRoute,
  useSidebarBreadcrumbs,
} from '@docusaurus/theme-common/internal'
import { translate } from '@docusaurus/Translate'
import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.css'

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

export type BreadcrumbsBaseProps = {
  homePage?: string
  homePageLink?: string
  breadcrumbs?: PropSidebarBreadcrumbsItem[]
}

export const BreadcrumbsBase: React.FC<BreadcrumbsBaseProps> = ({
  homePage,
  homePageLink,
  breadcrumbs,
}) => {
  if (!breadcrumbs) {
    return null
  }

  const categoryToLink = ['events']

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
        {!!homePage && (
          <Link to={homePageLink} className={clsx('breadcrumbs__item')}>
            <Typography variant="body3" component="span">
              {homePage}
            </Typography>
          </Link>
        )}
        {breadcrumbs.map((item, idx) => {
          const isLast = idx === breadcrumbs.length - 1
          const convertCategoryToLink = categoryToLink.includes(item.label)
          return (
            <BreadcrumbsItem
              key={idx}
              active={isLast}
              index={idx}
              addMicrodata={!!item.href}
            >
              {convertCategoryToLink ? (
                <Link to={`/${item.label}`}>
                  <BreadcrumbsItemLink href={item.href} isLast={isLast}>
                    {item.label}
                  </BreadcrumbsItemLink>
                </Link>
              ) : (
                <BreadcrumbsItemLink href={item.href} isLast={isLast}>
                  {item.label}
                </BreadcrumbsItemLink>
              )}
            </BreadcrumbsItem>
          )
        })}
      </ul>
    </nav>
  )
}

export default function DocBreadcrumbs() {
  const breadcrumbs = useSidebarBreadcrumbs()
  const homePageRoute = useHomePageRoute()
  const plugin = useActivePlugin()

  if (!breadcrumbs) {
    return null
  }

  const routeBasePath = plugin?.pluginData.path

  return (
    <BreadcrumbsBase
      homePage={
        homePageRoute &&
        translate({
          id: 'theme.docs.breadcrumbs.homePageLabel',
          message: 'Home',
        })
      }
      breadcrumbs={breadcrumbs}
      homePageLink={routeBasePath}
    />
  )
}
