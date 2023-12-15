import { THEME_BREAKPOINTS } from '@acid-info/lsd-react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import clsx from 'clsx'
import React, { useRef } from 'react'
import { lsdUtils } from '../../../lib/lsd.utils'
import { ScrollButtons } from '../ScrollButtons'
import { GridItem } from './GridItem'

export type GridProps = React.ComponentProps<typeof GridRoot> & {
  actions?: React.ReactNode
  leftLabel?: string
  rightLabel?: string
  spacingButtons?: boolean
}

export const Grid: { Item: typeof GridItem } & React.FC<GridProps> = ({
  actions,
  leftLabel = '',
  rightLabel = '',
  spacingButtons = false,
  children,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <GridRoot {...props} className={clsx(props.className, 'mdx-grid')}>
      <div className="mdx-grid__actions">
        {actions}
        <ScrollButtons
          containerRef={ref}
          className="mdx-grid__scroll"
          leftLabel={leftLabel}
          rightLabel={rightLabel}
          spacing={spacingButtons ? 'spaced' : 'grouped'}
        />
      </div>
      <div ref={ref} className={clsx('mdx-grid__content', 'hidden-scrollbar')}>
        {children}
      </div>
    </GridRoot>
  )
}

Grid.Item = GridItem

type GridBreakpointProps = {
  cols?: number
  wrap?: boolean
  gap?: string | number
  scrollButtons?: boolean
}

const GridRoot = styled.div<{
  xs?: GridBreakpointProps
  sm?: GridBreakpointProps
  md?: GridBreakpointProps
  lg?: GridBreakpointProps
  xl?: GridBreakpointProps
}>`
  width: 100%;

  .mdx-grid__scroll {
    display: flex;
  }

  .mdx-grid__content {
    display: grid;
    gap: var(--grid-gap);
    grid-template-columns: repeat(var(--grid-cols), minmax(0, 1fr));
    overflow: hidden;
  }

  .mdx-grid__actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;

    & > * {
      margin-bottom: 3rem;
    }
  }

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
        css`
          .mdx-grid__scroll {
            display: none;
          }
          .mdx-grid__content {
            display: grid;
            flex-wrap: unset;
            overflow-x: unset;
            overflow-y: unset;
            scroll-snap-type: unset;
          }
        `}

        ${typeof bp.wrap !== 'undefined' &&
        bp.wrap === false &&
        css`
          .mdx-grid__scroll {
            display: flex;
          }
          .mdx-grid__content {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: scroll;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
          }
        `}

        ${bp.scrollButtons === false &&
        css`
          .mdx-grid__scroll {
            display: none;
          }
        `}
      `)
    })}
`
