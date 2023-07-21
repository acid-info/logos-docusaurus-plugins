import baseThemeConfig from './base'

export const afaikInstituteThemeConfig: typeof baseThemeConfig = {
  ...baseThemeConfig,
  navbar: {
    ...baseThemeConfig.navbar,
    logo: {
      alt: 'AFAIK Institute',
      src: 'theme/image/logo-black.svg',
      srcDark: 'theme/image/logo.svg',
      height: 26,
    },
  },
  metadata: [
    {
      name: 'description',
      content:
        'A research lab for experimentation across our movement and idealistic world building. The institute is a sandbox for pilot projects for the future Logos tech stack and network state.',
    },
    { name: 'image', content: 'theme/image/preview-image.png' },
  ],
  footer: {
    ...baseThemeConfig.footer,
    copyright: `AFAIK Institute © ${new Date().getFullYear()}<br/>All rights reserved.`,
    logo: {
      alt: 'AFAIK Institute',
      src: 'theme/image/logo.svg',
      href: '/',
      width: 22,
    },
    links: [],
  },
}

export default afaikInstituteThemeConfig
