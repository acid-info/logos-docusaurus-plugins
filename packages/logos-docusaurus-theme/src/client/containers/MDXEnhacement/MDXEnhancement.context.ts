import React, { useContext, useMemo } from 'react'

export type MDXComponentType = 'heading'
export type MDXEnhancementPosition = 'after'

export type MDXEnhancementItem = {
  component: MDXComponentType
  position: MDXEnhancementPosition
  render: (props: any) => React.ReactNode
}

export type MDXEnhancementContextType = {
  items: MDXEnhancementItem[]
}

export const MDXEnhancementContext =
  React.createContext<MDXEnhancementContextType>({
    items: [],
  })

export const useMDXEnhancementElements = <T = any>(
  component: MDXComponentType,
  position: MDXEnhancementPosition,
  props: T,
): React.ReactNode => {
  const ctx = useContext(MDXEnhancementContext)
  if (!ctx) return []

  return useMemo(() => {
    const items = ctx.items.filter(
      (item) => item.component === component && item.position === position,
    )

    return items.map((item) => item.render(props))
  }, [component, position, props])
}
