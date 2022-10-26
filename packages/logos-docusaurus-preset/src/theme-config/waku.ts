import baseThemeConfig from './base'

export const wakuThemeConfig: typeof baseThemeConfig = {
  ...baseThemeConfig,
  navbar: {
    ...baseThemeConfig.navbar,
    logo: {
      alt: 'Waku',
      src: 'theme/image/logo.svg',
      height: 26,
    },
    items: [
      {
        to: 'blog',
        label: 'Blog',
      },
      {
        type: 'localeDropdown',
        position: 'right',
      },
    ],
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
    copyright: `Waku, ${new Date().getFullYear()}`,
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
            label: 'Discord',
            href: '4qdQN5JaWW',
          },
          {
            label: 'Twitter',
            href: 'codexstorage',
          },
        ],
      },
    ],
  },
}

export default wakuThemeConfig
