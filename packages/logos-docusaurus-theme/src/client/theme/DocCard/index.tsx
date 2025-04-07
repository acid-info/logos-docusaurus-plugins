import { translate } from '@docusaurus/Translate'
import isInternalUrl from '@docusaurus/isInternalUrl'
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs'

import type { Props } from '@theme/DocCard'
import React, { ReactElement } from 'react'
import { PageCard } from '../../components/mdx/PageCard'
import {
  findFirstSidebarItemLink,
  useDocById,
} from '@docusaurus/plugin-content-docs/lib/client/docsUtils.js'

function CardCategory({
  item,
}: {
  item: PropSidebarItemCategory
}): ReactElement | null {
  const href = findFirstSidebarItemLink(item)

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null
  }

  return (
    <PageCard
      href={href}
      // icon="🗃️"
      title={item.label}
      description={
        item.description ??
        translate(
          {
            message: '{count} items',
            id: 'theme.docs.DocCard.categoryDescription',
            description:
              'The default description for a category card in the generated index about how many items this category includes',
          },
          { count: item.items.length },
        )
      }
    />
  )
}

function CardLink({ item }: { item: PropSidebarItemLink }): ReactElement {
  const icon = isInternalUrl(item.href) ? '📄️' : '🔗'
  const doc = useDocById(item.docId ?? undefined)
  return (
    <PageCard
      href={item.href}
      // icon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  )
}

export default function DocCard({ item }: Props): ReactElement {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />
    case 'category':
      return <CardCategory item={item} />
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`)
  }
}
