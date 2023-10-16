import { translate } from '@docusaurus/Translate'
import isInternalUrl from '@docusaurus/isInternalUrl'
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs'
import {
  findFirstCategoryLink,
  useDocById,
} from '@docusaurus/theme-common/internal'
import type { Props } from '@theme/DocCard'
import React from 'react'
import { PageCard } from '../../components/mdx/PageCard'

function CardCategory({
  item,
}: {
  item: PropSidebarItemCategory
}): JSX.Element | null {
  const href = findFirstCategoryLink(item)

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

function CardLink({ item }: { item: PropSidebarItemLink }): JSX.Element {
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

export default function DocCard({ item }: Props): JSX.Element {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />
    case 'category':
      return <CardCategory item={item} />
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`)
  }
}
