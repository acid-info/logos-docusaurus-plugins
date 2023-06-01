import baseThemeConfig from './base'

export const nimbusThemeConfig: typeof baseThemeConfig = {
  ...baseThemeConfig,
  navbar: {
    ...baseThemeConfig.navbar,
    logo: {
      alt: 'Nimbus',
      src: 'theme/image/logo-black.svg',
      srcDark: 'theme/image/logo.svg',
      height: 26,
    },
    items: [],
  },
  metadata: [
    { name: 'keywords', content: 'nimbus' },
    {
      name: 'description',
      content: 'Nimbus, a Lighter Ethereum Client',
    },
    { name: 'image', content: 'theme/image/preview-image.png' },
  ],
  footer: {
    ...baseThemeConfig.footer,
    copyright: `Nimbus © ${new Date().getFullYear()}<br/>All rights reserved.`,
    logo: {
      alt: 'Nimbus',
      src: 'theme/image/logo.svg',
      href: '/',
      width: 22,
    },
    links: [
      {
        items: [
          {
            label: 'Gitter',
            href: 'https://gitter.im/status-im/nimbus',
          },
          {
            label: 'Twitter',
            href: 'https://twitter.com/ethnimbus',
          },
          {
            label: 'Discord',
            href: 'https://discord.gg/XRxWahP',
          },
          {
            label: 'Status',
            href: 'https://join.status.im/chat/public/nimbus-general',
          },
        ],
      },
    ],
  },
}

export default nimbusThemeConfig
