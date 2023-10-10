import { THEME_BREAKPOINTS } from '@acid-info/lsd-react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import clsx from 'clsx'
import React from 'react'
import { lsdUtils } from '../../../lib/lsd.utils'
import { GridItem } from './GridItem'

export type GridProps = React.ComponentProps<typeof GridRoot> & {}

export const Grid: { Item: typeof GridItem } & React.FC<GridProps> = ({
  children,
  ...props
}) => {
  return (
    <GridRoot {...props} className={clsx(props.className, 'hidden-scrollbar')}>
      {children}
    </GridRoot>
  )
}

Grid.Item = GridItem

type GridBreakpointProps = {
  cols?: number
  wrap?: boolean
  gap?: string | number
}

const GridRoot = styled.div<{
  xs?: GridBreakpointProps
  sm?: GridBreakpointProps
  md?: GridBreakpointProps
  lg?: GridBreakpointProps
  xl?: GridBreakpointProps
}>`
  width: 100%;
  overflow: hidden;
  display: grid;

  gap: var(--grid-gap);
  grid-template-columns: repeat(var(--grid-cols), minmax(0, 1fr));

  ${(props) =>
    THEME_BREAKPOINTS.map((key) => {
      if (!props[key]) return null

      const bp = props[key] as GridBreakpointProps

      return lsdUtils.responsive(
        props.theme as any,
        key,
        'up',
      )(css`
        ${typeof bp.cols !== 'undefined' &&
        `
          --grid-cols: ${bp.cols};
        `}

        ${typeof bp.gap !== 'undefined' &&
        `
          --grid-gap: ${bp.gap};
        `}

        ${(typeof bp.wrap === 'undefined' || bp.wrap === true) &&
        `
          display: grid;
          flex-wrap: unset;
          overflow-x: unset;
          overflow-y: unset;
          scroll-snap-type: unset;
        `}

        ${typeof bp.wrap !== 'undefined' &&
        bp.wrap === false &&
        `
          display: flex;
          flex-wrap: nowrap;
          overflow-x: scroll;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
        `}
      `)
    })}
`
