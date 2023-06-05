import { defaultThemes, ThemeProvider } from '@acid-info/lsd-react'
import { useActivePlugin } from '@docusaurus/plugin-content-docs/lib/client/index.js'
import {
  ColorModeProvider,
  useColorMode,
} from '@docusaurus/theme-common/internal'
import React from 'react'
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

  return (activePlugin ? docThemes : defaultThemes)[colorMode.colorMode]
}

const Content = ({ children }) => {
  const theme = useTheme()
  const options = useDocThemeOptions()
  const hideDocSidebar = options?.sidebar?.hide

  return (
    <ThemeProvider theme={theme}>
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
