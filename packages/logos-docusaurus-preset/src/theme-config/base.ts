import { ThemeConfig } from '@docusaurus/preset-classic'

const lightCodeTheme = require('@acid-info/logos-docusaurus-theme/lib/client/prism/light-theme')
const darkCodeTheme = require('@acid-info/logos-docusaurus-theme/lib/client/prism/dark-theme')

export const baseThemeConfig: ThemeConfig = {
  docs: {
    sidebar: { hideable: true },
  },
  metadata: [],
  colorMode: {
    disableSwitch: true,
    defaultMode: 'dark',
  },
  navbar: {
    title: '',
    logo: {},
    hideOnScroll: true,
  },
  footer: {
    logo: {},
    links: [
      {
        title: 'shared:Research',
        items: [
          {
            href: 'https://research.logos.co/',
            label: 'Logos Research',
          },
        ],
      },
      {
        title: 'shared:Infrastructure',
        items: [
          {
            href: 'https://logos.co/',
            label: 'Logos',
          },
          {
            href: 'https://nimbus.team/',
            label: 'Nimbus',
          },
        ],
      },
    ],
    copyright: `Logos, ${new Date().getFullYear()}`,
  },
  prism: {
    theme: lightCodeTheme.default,
    darkTheme: darkCodeTheme.default,
  },
}

export default baseThemeConfig
