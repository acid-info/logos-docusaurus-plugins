import { defaultThemes, ThemeProvider } from '@acid-info/lsd-react'
import {
  ColorModeProvider,
  useColorMode,
} from '@docusaurus/theme-common/internal'
import React from 'react'
import { useDocThemeOptions } from '../lib/useThemeOptions'
import styles from './style.module.css'
import { lightTheme, darkTheme } from '../lib/themes'

const Content = ({ children }) => {
  const colorMode = useColorMode()

  const options = useDocThemeOptions()
  const hideDocSidebar = options?.sidebar?.hide

  return (
    <ThemeProvider
      theme={colorMode.colorMode === 'dark' ? darkTheme : lightTheme}
    >
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
