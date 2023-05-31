import { defaultThemes, ThemeProvider } from '@acid-info/lsd-react'
import {
  ColorModeProvider,
  useColorMode,
} from '@docusaurus/theme-common/internal'
import React from 'react'
import styles from './style.module.css'

const Content = ({ children }) => {
  const colorMode = useColorMode()
  return (
    <ThemeProvider
      theme={
        colorMode.colorMode === 'dark'
          ? defaultThemes.dark
          : defaultThemes.light
      }
    >
      <div className={styles.root}>{children}</div>
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
