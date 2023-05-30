import React from 'react'
import { ThemeProvider, defaultThemes } from '@acid-info/lsd-react'
import styles from './style.module.css'

export default function Root({ children }) {
  return (
    <ThemeProvider theme={defaultThemes.dark}>
      <div className={styles.root}>{children}</div>
    </ThemeProvider>
  )
}
