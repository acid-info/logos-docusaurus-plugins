import { ColorModeProvider } from '@docusaurus/theme-common/internal'
import React from 'react'
import { LightBoxProvider } from '../containers/LightBox/LightBox'
import { ThemeProvider } from '../containers/ThemeProvider'
import { useDocThemeOptions } from '../lib/useThemeOptions'
import styles from './style.module.css'

export default function Root({ children }) {
  const options = useDocThemeOptions()
  const hideDocSidebar = options?.sidebar?.hide

  return (
    <ColorModeProvider>
      <ThemeProvider>
        <LightBoxProvider>
          <div className={styles.root} data-hidden-doc-sidebar={hideDocSidebar}>
            {children}
          </div>
        </LightBoxProvider>
      </ThemeProvider>
    </ColorModeProvider>
  )
}
