import { ThemeConfig } from '@docusaurus/preset-classic'

const lightCodeTheme = require('prism-react-renderer/themes/github')
// const darkCodeTheme = require('prism-react-renderer/themes/vsDark')
const darkCodeTheme = require('@acid-info/logos-docusaurus-theme/lib/client/prism/dark-theme')

export const baseThemeConfig: ThemeConfig = {
  docs: {
    sidebar: { hideable: true },
  },
  metadata: [],
  colorMode: {
    disableSwitch: false,
    defaultMode: 'dark',
  },
  navbar: {
    title: '',
    logo: {},
  },
  footer: {
    logo: {},
    links: [],
    copyright: `Logos, ${new Date().getFullYear()}`,
  },
  prism: {
    theme: lightCodeTheme,
    darkTheme: darkCodeTheme.default,
  },
}

export default baseThemeConfig
