import baseThemeConfig from './base'

export const nomosThemeConfig: typeof baseThemeConfig = {
  ...baseThemeConfig,
  navbar: {
    ...baseThemeConfig.navbar,
    logo: {
      alt: 'Nomos',
      src: 'theme/image/logo.svg',
      srcDark: 'theme/image/logo.svg',
      height: 26,
    },
    items: [],
  },
  metadata: [
    { name: 'keywords', content: 'Nomos' },
    {
      name: 'description',
      content:
        "Nomos supports the demands of aspiring network states, defending self-determination at the network level for humanity's underserved.",
    },
    { name: 'image', content: 'theme/image/preview-image.png' },
  ],
  footer: {
    ...baseThemeConfig.footer,
    copyright: `Nomos © ${new Date().getFullYear()}<br/>All rights reserved.`,
    logo: {
      alt: 'Nomos',
      src: 'theme/image/logo.svg',
      href: '/',
      width: 22,
    },
    links: [],
  },
}

export default nomosThemeConfig
