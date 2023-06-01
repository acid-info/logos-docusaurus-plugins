// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require('dotenv').config()

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TITLE',
  url: 'https://url',
  baseUrl: '/',

  customFields: {
    ghostAPiKey: process.env.GHOST_API_KEY,
  },
  markdown: {
    mermaid: true,
  },

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@acid-info/logos-docusaurus-preset',
      /** @type {import('@acid-info/logos-docusaurus-preset').PluginOptions} */
      ({
        businessUnit: 'Logos',
        theme: {
          name: 'default',
          options: {
            customCss: [require.resolve('./src/css/custom.scss')],
          },
        },
        docs: {
          routeBasePath: '/docs',
          versions: {
            current: {
              label: 'current',
            },
          },
          lastVersion: 'current',
        },
      }),
    ],
  ],
  themes: ['@docusaurus/theme-mermaid'],

  themeConfig:
    /** @type {import('@acid-info/logos-docusaurus-preset').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      navbar: {
        items: [
          {
            type: 'search',
          },
          {
            label: 'About',
            to: '/docs',
          },
          {
            label: 'Blog',
            href: 'https://logos.co/',
          },
          {
            label: 'Github',
            href: 'https://github.com/logos-co',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        copyright: 'Logos @2023<br/>All Rights Reserved.',
        links: [
          {
            items: [
              {
                href: '/',
                label: 'Twitter',
              },
              {
                href: '/',
                label: 'Discord',
              },
              {
                href: '/',
                label: 'Docs',
              },
              {
                href: '/',
                label: 'Github',
              },
            ],
          },
          {
            items: [
              {
                href: '/',
                label: 'Contact us',
              },
              {
                href: '/',
                label: 'Work with us',
              },
              {
                href: '/',
                label: 'Privacy policy',
              },
              {
                href: '/',
                label: 'Terms & conditions',
              },
            ],
          },
        ],
      },
    }),
}

module.exports = config
