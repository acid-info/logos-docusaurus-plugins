import { ThemeConfig } from '@docusaurus/preset-classic'

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

export const baseThemeConfig: ThemeConfig = {
  docs: {
    sidebar: { hideable: true },
  },
  metadata: [],
  colorMode: {
    disableSwitch: true,
  },
  navbar: {
    title: '',
    logo: {},
    items: [
      {
        type: 'docsVersionDropdown',
        position: 'right',
      },
      {
        type: 'localeDropdown',
        position: 'right',
      },
    ],
  },
  footer: {
    logo: {},
    links: [
      {
        title: 'Community',
        items: [],
      },
    ],
    copyright: `Logos, ${new Date().getFullYear()}`,
  },
  prism: {
    theme: lightCodeTheme,
    darkTheme: darkCodeTheme,
  },
}

export default baseThemeConfig
