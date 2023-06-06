import baseThemeConfig from './base'

export const vacResearchThemeConfig: typeof baseThemeConfig = {
  ...baseThemeConfig,
  navbar: {
    ...baseThemeConfig.navbar,
    logo: {
      alt: 'Vac Research',
      src: 'theme/image/logo.svg',
      height: 26,
    },
    items: [],
  },
  metadata: [
    {
      name: 'description',
      content: 'Vac - Communication, Privacy, Etc.',
    },
    { name: 'image', content: 'theme/image/preview-image.png' },
  ],
  footer: {
    ...baseThemeConfig.footer,
    copyright: `Vac Research © ${new Date().getFullYear()}<br/>All rights reserved.`,
    logo: {
      alt: 'Vac Research',
      src: 'theme/image/logo.svg',
      href: '/',
      width: 22,
    },
    links: [],
  },
}

export default vacResearchThemeConfig
