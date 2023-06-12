import {
  defaultThemes,
  Theme,
  ThemeProvider as LSDThemeProvider,
} from '@acid-info/lsd-react'
import { useActivePlugin } from '@docusaurus/plugin-content-docs/lib/client/index.js'
import {
  ColorModeProvider,
  useColorMode,
} from '@docusaurus/theme-common/internal'
import { css, Global } from '@emotion/react'
import React, { useMemo } from 'react'
import { darkTheme, lightTheme } from '../lib/themes'
import { useDocThemeOptions } from '../lib/useThemeOptions'
import styles from './style.module.css'

const docThemes = {
  light: lightTheme,
  dark: darkTheme,
}

const useTheme = () => {
  const colorMode = useColorMode()
  const activePlugin = useActivePlugin()

  const themes = activePlugin ? docThemes : defaultThemes

  return {
    dark: themes.dark,
    light: themes.light,
    current: themes[colorMode.colorMode],
    colorMode: colorMode.colorMode,
  }
}

const useThemeCssVars = (theme: Theme, light: boolean = false) =>
  useMemo(
    () => css`
      [data-theme=${light ? 'light' : 'dark'}] {
        ${theme.cssVars}
      }
    `,
    [theme],
  )

const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const theme = useTheme()
  const darkCssVars = useThemeCssVars(theme.dark, false)
  const lightCssVars = useThemeCssVars(theme.light, true)

  return (
    <LSDThemeProvider theme={theme.current} injectCssVars={false}>
      {children}
      <Global styles={darkCssVars} />
      <Global styles={lightCssVars} />
    </LSDThemeProvider>
  )
}

const Content = ({ children }) => {
  const options = useDocThemeOptions()
  const hideDocSidebar = options?.sidebar?.hide

  return (
    <ThemeProvider>
      <div className={styles.root} data-hidden-doc-sidebar={hideDocSidebar}>
        {children}
      </div>
    </ThemeProvider>
  )
}

export default function Root({ children }) {
  return (
    <ColorModeProvider>
      <Content>{children}</Content>
    </ColorModeProvider>
  )
}
