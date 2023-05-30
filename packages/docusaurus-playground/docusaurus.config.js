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
      navbar: {
        items: [
          {
            label: 'Docs',
            href: '/docs',
          },
          {
            label: 'Features',
            href: '#features',
          },
          {
            label: 'Showcase',
            href: '#showcase',
          },
        ],
      },
      footer: {
        copyright: 'Copyright @2023 Logos <br/> Built with Docusaurus.',
        links: [
          {
            title: 'Learn',
            items: [
              {
                href: '/',
                label: 'Introduction',
              },
              {
                href: '/',
                label: 'Installation',
              },
              {
                href: '/',
                label: 'Migrate from v1 to v2',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                href: '/',
                label: 'Blog',
              },
              {
                href: '/',
                label: 'Changelog',
              },
              {
                href: '/',
                label: 'Github',
              },
              {
                href: '/',
                label: 'Twitter',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                href: '/',
                label: 'Stack Overflow',
              },
              {
                href: '/',
                label: 'Feature Requests',
              },
              {
                href: '/',
                label: 'Discord',
              },
              {
                href: '/',
                label: 'Help',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                href: '/',
                label: 'Privacy',
              },
              {
                href: '/',
                label: 'Terms',
              },
              {
                href: '/',
                label: 'Data policy',
              },
              {
                href: '/',
                label: 'Cookie policy',
              },
            ],
          },
        ],
      },
    }),
}

module.exports = config
