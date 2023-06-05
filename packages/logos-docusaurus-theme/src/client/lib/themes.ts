import {
  createTheme,
  CreateThemeProps,
  defaultThemes,
} from '@acid-info/lsd-react'

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
    name: 'logos-docusaurus-theme-light',
  },
  defaultThemes.dark,
)
