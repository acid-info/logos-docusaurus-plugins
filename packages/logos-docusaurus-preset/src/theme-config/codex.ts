import baseThemeConfig from './base'

export const codexThemeConfig: typeof baseThemeConfig = {
  ...baseThemeConfig,
  navbar: {
    ...baseThemeConfig.navbar,
    logo: {
      alt: 'Codex',
      src: 'theme/image/logo-black.svg',
      srcDark: 'theme/image/logo.svg',
      width: 24,
      height: 26,
    },
  },
  metadata: [
    { name: 'keywords', content: 'codex, storage' },
    {
      name: 'description',
      content: 'Codex is building a Decentralized Durability Storage',
    },
    { name: 'image', content: 'theme/image/preview-image.png' },
  ],
  footer: {
    ...baseThemeConfig.footer,
    copyright: `Codex, ${new Date().getFullYear()}`,
    logo: {
      alt: 'Codex',
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

export default codexThemeConfig
