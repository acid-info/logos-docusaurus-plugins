import clsx from 'clsx'
import React from 'react'
import styled from '@emotion/styled'
import { THEME_BREAKPOINTS } from '@acid-info/lsd-react'
import { lsdUtils } from '../../../lib/lsd.utils'
import { css } from '@emotion/react'

export type GridItemProps = React.ComponentProps<typeof Root> & {}

export const GridItem: React.FC<GridItemProps> = ({ children, ...props }) => {
  return (
    <Root {...props} className={clsx(props.className)}>
      {children}
    </Root>
  )
}

const Root = styled.div<{
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}>`
  ${(props) =>
    THEME_BREAKPOINTS.map((key) => {
      if (!props[key]) return null

      const bp = props[key] as number

      return lsdUtils.responsive(
        props.theme as any,
        key,
        'up',
      )(css`
        grid-column: span ${bp};
        flex-basis: calc(100% / var(--grid-cols) * ${bp});
      `)
    })}
`
