import {
  createTheme,
  CreateThemeProps,
  defaultThemes,
  Theme,
} from '@acid-info/lsd-react'
import { useActivePlugin } from '@docusaurus/plugin-content-docs/lib/client/index.js'
import { useColorMode } from '@docusaurus/theme-common'
import { css } from '@emotion/react'
import { useMemo } from 'react'
import { useThemeOptions } from './useThemeOptions'

const typography: CreateThemeProps['typography'] = {
  h1: {
    fontSize: '2.875rem',
    lineHeight: '3.25rem',
  },
  h2: {
    fontSize: '2rem',
    lineHeight: '2.5rem',
  },
  h3: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
  },
  h4: {
    fontSize: '1.375rem',
    lineHeight: '1.75rem',
  },
}

const typographyMobile: CreateThemeProps['typography'] = {
  h1: {
    fontSize: '2.25rem',
    lineHeight: '2.75rem',
  },
  h2: {
    fontSize: '1.75rem',
    lineHeight: '2.25rem',
  },
}

const breakpoints: CreateThemeProps['breakpoints'] = {
  xs: {
    width: 0,
    typography: typographyMobile,
  },
  sm: {
    width: 576,
  },
  md: {
    width: 768,
  },
  lg: {
    width: 997,
    typography,
  },
  xl: {
    width: 1200,
  },
}

export const lightTheme = createTheme(
  {
    breakpoints,
    palette: {},
    typography,
    typographyGlobal: {},
    name: 'logos-docusaurus-theme-light',
  },
  defaultThemes.light,
)

export const darkTheme = createTheme(
  {
    breakpoints: breakpoints,
    palette: {},
    typography,
    typographyGlobal: {},
    name: 'logos-docusaurus-theme-dark',
  },
  defaultThemes.dark,
)

const docThemes = {
  light: lightTheme,
  dark: darkTheme,
}

const useThemeCssVars = (theme: Theme, colorMode: string) =>
  useMemo(
    () => css`
      [data-theme=${colorMode}] {
        ${theme.cssVars}
      }
    `,
    [theme],
  )

export const useTheme = () => {
  const colorMode = useColorMode()
  const activePlugin = useActivePlugin()
  const { typography } = useThemeOptions()
  const genericFontFamily = typography?.genericFontFamily ?? 'sans-serif'

  const baseThemes = activePlugin ? docThemes : defaultThemes

  const themes = useMemo(() => {
    const options = {
      breakpoints: {},
      palette: {},
      typography: {},
      typographyGlobal: {
        genericFontFamily,
      },
    }

    return {
      light: createTheme(options, baseThemes.light),
      dark: createTheme(options, baseThemes.dark),
    }
  }, [baseThemes, genericFontFamily])

  return {
    dark: themes.dark,
    light: themes.light,
    current: themes[colorMode.colorMode],
    colorMode: colorMode.colorMode,
    lightCssVars: useThemeCssVars(themes.light, 'light'),
    darkCssVars: useThemeCssVars(themes.dark, 'dark'),
  }
}
