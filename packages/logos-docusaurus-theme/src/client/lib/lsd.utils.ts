import {
  Breakpoints,
  Theme,
  THEME_BREAKPOINTS,
  TypographyVariants,
} from '@acid-info/lsd-react'
import { css, SerializedStyles } from '@emotion/react'

export class LsdUtils {
  private _breakpoints: Record<
    string,
    Record<string, { min: number; max: number }>
  > = {}

  private getBreakpoints = (theme: Theme) => {
    if (this._breakpoints[theme.name]) {
      return this._breakpoints[theme.name]
    }

    const breakpoints: (typeof this._breakpoints)[string] = {}
    for (let i = 0; i < THEME_BREAKPOINTS.length; i++) {
      const name = THEME_BREAKPOINTS[i]!
      const breakpoint = theme.breakpoints[name]
      const next = theme.breakpoints[THEME_BREAKPOINTS[i + 1]!]

      const min = breakpoint.width
      const max = next ? next.width - 1 : Number.MAX_SAFE_INTEGER

      breakpoints[name] = {
        min,
        max,
      }
    }

    this._breakpoints[theme.name] = breakpoints

    return breakpoints
  }

  private getBreakpoint = (theme: Theme, breakpoint: Breakpoints) => {
    const breakpoints = this.getBreakpoints(theme)
    return breakpoints![breakpoint]
  }

  breakpoints = (exclude: Breakpoints[] = []) =>
    THEME_BREAKPOINTS.filter((b) => !exclude.find((b2) => b2 === b))

  typography = (variant: TypographyVariants | 'subtitle3', important = false) =>
    variant === 'subtitle3'
      ? `
    font-size: 12px !important;
    font-weight: 400 !important;
    line-height: 16px !important;
  `
      : `
    font-size: var(--lsd-${variant}-fontSize)${important ? '!important' : ''};
    font-weight: var(--lsd-${variant}-fontWeight)${
          important ? '!important' : ''
        };
    line-height: var(--lsd-${variant}-lineHeight)${
          important ? '!important' : ''
        };
  `

  breakpoint = (
    theme: Theme,
    breakpoint: Breakpoints,
    func: 'exact' | 'up' | 'down' | 'between' = 'up',
    next?: Breakpoints,
  ) => {
    const { min, max } = this.getBreakpoint(theme, breakpoint)!

    let media = `@media `

    if (func === 'up') {
      media += `(min-width: ${min}px)`
    } else if (func === 'down') media += `(max-width: ${max}px)`
    else if (func === 'between' && !!next) {
      const nextBreakpoint = this.getBreakpoint(theme, next)
      media += `(min-width: ${min}px) and (max-width: ${
        nextBreakpoint!.min - 1
      }px)`
    } else media += `(min-width: ${min}px) and (max-width: ${max}px)`

    return `${media}`
  }

  responsive = (
    theme: Theme,
    breakpoint: Breakpoints,
    func: 'exact' | 'up' | 'down' = 'up',
  ) => {
    const media = lsdUtils.breakpoint(theme, breakpoint, func)
    return (styles: SerializedStyles) => css`
      ${media} {
        ${styles}
      }
    `
  }
}

export const lsdUtils = new LsdUtils()
