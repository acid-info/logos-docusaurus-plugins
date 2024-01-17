import { ThemeProvider as LSDThemeProvider } from '@acid-info/lsd-react'
import { Global } from '@emotion/react'
import React from 'react'
import { useTheme } from '../../lib/themes'

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const theme = useTheme()

  return (
    <LSDThemeProvider theme={theme.current} injectCssVars={false}>
      <Global styles={theme.cssVars} />
      {children}
    </LSDThemeProvider>
  )
}
