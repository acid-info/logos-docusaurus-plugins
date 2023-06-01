import baseThemeConfig from './base'

export const wakuThemeConfig: typeof baseThemeConfig = {
  ...baseThemeConfig,
  navbar: {
    ...baseThemeConfig.navbar,
    logo: {
      alt: 'Waku',
      src: 'theme/image/logo-black.svg',
      srcDark: 'theme/image/logo.svg',
      height: 26,
    },
    items: [],
  },
  metadata: [
    { name: 'keywords', content: 'waku, web3' },
    {
      name: 'description',
      content:
        'Waku is the communication layer for Web3. Decentralized communication that scales.',
    },
    { name: 'image', content: 'theme/image/preview-image.png' },
  ],
  footer: {
    ...baseThemeConfig.footer,
    copyright: `Waku © ${new Date().getFullYear()}<br/>All rights reserved.`,
    logo: {
      alt: 'Waku',
      src: 'theme/image/logo.svg',
      href: '/',
      width: 22,
    },
    links: [
      {
        title: 'Community',
        items: [
          {
            label: 'Discourse',
            href: 'https://forum.vac.dev/',
          },
          {
            label: 'Discord',
            href: 'j5pGbn7MHZ',
          },
          {
            label: 'Twitter',
            href: 'waku-org',
          },
        ],
      },
    ],
  },
}

export default wakuThemeConfig
