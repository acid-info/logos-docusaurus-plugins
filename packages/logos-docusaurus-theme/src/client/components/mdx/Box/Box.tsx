import clsx from 'clsx'
import React from 'react'
import { makeStyle } from '../../../lib/makeStyle'
import './Box.scss'

type BreakpointsStyle<T> = {
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
}

function vars(
  key: string,
  _val: BreakpointsStyle<string | number> | string | number,
  defaultValue: string | number,
  unit?: string,
) {
  const val =
    typeof _val === 'string' || typeof _val === 'number' ? { xs: _val } : _val

  const variables: string[][] = []

  const format = (value: any) => {
    return typeof value === 'number' && unit ? `${value}${unit}` : `${value}`
  }

  ;['xs', 'sm', 'md', 'lg', 'xl'].forEach((bp, index) => {
    const value = val[bp]
    if (!value) {
      const prev = variables[index - 1]?.[1]
      variables.push([`${key}-${bp}`, prev ? prev : format(defaultValue)])
    } else variables.push([`${key}-${bp}`, format(value)])
  })

  return Object.fromEntries(variables)
}

export type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  top?: BreakpointsStyle<number> | number
  bottom?: BreakpointsStyle<number> | number
}

export const Box: React.FC<BoxProps> = ({
  top = 0,
  bottom = 0,
  className,
  style = {},
  children,
  ...props
}) => {
  return (
    <div
      className={clsx(className, 'mdx-box')}
      style={makeStyle(
        { ...style },
        {
          ...vars('mdx-box-top', top, 0, 'px'),
          ...vars('mdx-box-bottom', bottom, 0, 'px'),
        },
      )}
      {...props}
    >
      {children}
    </div>
  )
}
