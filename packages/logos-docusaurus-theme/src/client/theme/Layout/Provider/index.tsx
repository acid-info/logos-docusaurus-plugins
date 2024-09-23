import React from 'react'
import { composeProviders } from '@docusaurus/theme-common'
import {
  AnnouncementBarProvider,
  DocsPreferredVersionContextProvider,
  ScrollControllerProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider,
} from '@docusaurus/plugin-content-blog/client'
import type { Props } from '@theme/Layout/Provider'

const Provider = composeProviders([
  AnnouncementBarProvider,
  ScrollControllerProvider,
  DocsPreferredVersionContextProvider,
  PluginHtmlClassNameProvider,
  NavbarProvider,
])

export default function LayoutProvider({ children }: Props): JSX.Element {
  return <Provider>{children}</Provider>
}
