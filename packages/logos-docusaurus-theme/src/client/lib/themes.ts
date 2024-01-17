import { createTheme, defaultThemes, Theme } from '@acid-info/lsd-react'
import { useColorMode } from '@docusaurus/theme-common'
import { css } from '@emotion/react'
import { useMemo } from 'react'
import { useThemeOptions } from './useThemeOptions'

const useThemeCssVars = (light: Theme, dark: Theme, fallback: Theme) =>
  useMemo(
    () => css`
      html:not([data-theme]) {
        ${fallback.cssVars}
      }

      html[data-theme='light'] {
        ${light.cssVars}
      }

      html[data-theme='dark'] {
        ${dark.cssVars}
      }
    `,
    [dark, light],
  )

export const useTheme = () => {
  const colorMode = useColorMode()
  const { typography } = useThemeOptions()
  const genericFontFamily = typography?.genericFontFamily ?? 'sans-serif'

  const baseThemes = defaultThemes

  const themes = useMemo(() => {
    const options = {
      breakpoints: {},
      palette: {},
      typography: {},
      typographyGlobal: {
        genericFontFamily,
      },
      spacing: [],
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
    cssVars: useThemeCssVars(themes.light, themes.dark, themes.light),
  }
}
