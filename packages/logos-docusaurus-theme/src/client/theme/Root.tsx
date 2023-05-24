import React from 'react'
import { ThemeProvider, defaultThemes } from '@acid-info/lsd-react'

export default function Root({ children }) {
  return <ThemeProvider theme={defaultThemes.dark}>{children}</ThemeProvider>
}
