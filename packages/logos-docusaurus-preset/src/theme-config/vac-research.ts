import baseThemeConfig from './base'

export const vacResearchThemeConfig: typeof baseThemeConfig = {
  ...baseThemeConfig,
  navbar: {
    ...baseThemeConfig.navbar,
    logo: {
      alt: 'Logos Research',
      src: 'theme/image/logo-black.svg',
      srcDark: 'theme/image/logo.svg',
      height: 26,
    },
    items: [],
  },
  metadata: [
    {
      name: 'description',
      content: 'Logos Research - Communication, Privacy, Etc.',
    },
    { name: 'image', content: 'theme/image/preview-image.png' },
  ],
  footer: {
    ...baseThemeConfig.footer,
    copyright: `Logos Research © ${new Date().getFullYear()}<br/>All rights reserved.`,
    logo: {
      alt: 'Logos Research',
      src: 'theme/image/logo.svg',
      href: '/',
      width: 22,
    },
    links: [],
  },
}

export default vacResearchThemeConfig
