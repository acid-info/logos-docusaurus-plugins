import React from 'react'

export const makeStyle = (
  style: React.CSSProperties,
  vars: Record<string, any> = {},
) =>
  ({
    ...style,
    ...Object.entries(vars).reduce(
      (value, [name, val]) => ({ ...value, [`--${name}`]: val }),
      {},
    ),
  } as React.CSSProperties)
