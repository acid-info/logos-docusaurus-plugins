import React, { ReactElement } from 'react'
import { composeProviders } from '@docusaurus/theme-common'
import {
  AnnouncementBarProvider,
  ScrollControllerProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider,
} from '@docusaurus/theme-common/internal'
import type { Props } from '@theme/Layout/Provider'

const Provider = composeProviders([
  AnnouncementBarProvider,
  ScrollControllerProvider,
  PluginHtmlClassNameProvider,
  NavbarProvider,
])

export default function LayoutProvider({ children }: Props): ReactElement {
  return <Provider>{children}</Provider>
}
