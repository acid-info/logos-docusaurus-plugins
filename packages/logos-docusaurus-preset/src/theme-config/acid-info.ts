import baseThemeConfig from './base'

export const acidInfoThemeConfig: typeof baseThemeConfig = {
  ...baseThemeConfig,
  navbar: {
    ...baseThemeConfig.navbar,
    logo: {
      alt: 'Acid.info',
      src: 'theme/image/logo.svg',
      height: 26,
    },
    items: [],
  },
  metadata: [
    {
      name: 'description',
      content: 'The future is a second enlightenment of the digital world.',
    },
    { name: 'image', content: 'theme/image/preview-image.png' },
  ],
  footer: {
    ...baseThemeConfig.footer,
    copyright: `Acid.info © ${new Date().getFullYear()}<br/>All rights reserved.`,
    logo: {
      alt: 'Acid.info',
      src: 'theme/image/logo.svg',
      href: '/',
      width: 22,
    },
    links: [],
  },
}

export default acidInfoThemeConfig
