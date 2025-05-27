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
            href: 'https://vac.dev',
            label: 'VacP2P',
          },
        ],
      },
      {
        title: 'shared:Infrastructure',
        items: [
          {
            href: 'https://waku.org/',
            label: 'Waku',
          },
          {
            href: 'https://nimbus.team/',
            label: 'Nimbus',
          },
          {
            href: 'https://codex.storage',
            label: 'Codex',
          },
          {
            href: 'https://nomos.tech',
            label: 'Nomos',
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
