// @ts-check

// Note: type annotations allow type checking and IDEs autocompletion
require('dotenv').config()

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TITLE',
  url: 'https://url',
  baseUrl: '/',

  customFields: {},
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
        businessUnit: 'Nomos',
        theme: {
          name: 'default',
          options: {
            customCss: [require.resolve('./src/css/custom.scss')],
            docs: {
              default: {
                sidebar: {
                  hide: false,
                },
              },
            },
          },
        },
        docs: {
          routeBasePath: '/about',
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

  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      /** @type {import('@docusaurus/plugin-content-blog').PluginOptions} */
      ({
        id: 'blog',
        routeBasePath: '/rlog',
        path: 'rlog',
        blogTitle: 'Rlog - Vac Research Log',
        blogDescription:
          'Vac builds public good protocols for the decentralized web.',
        blogSidebarCount: 0,
        authorsMapPath: 'authors.yml',
      }),
    ],
    [
      '@acid-info/docusaurus-fathom',
      {
        siteId: 'TEST',
        scriptUrl: 'https://fathom.status.im/tracker.js',
        disabled: true,
        hostnames: ['waku.org'],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@acid-info/logos-docusaurus-preset').ThemeConfig} */
    ({
      navbar: {
        items: [
          {
            type: 'search',
          },
          {
            label: 'About',
            to: '/about',
          },
          {
            label: 'Features',
            href: '/#features',
          },
          {
            label: 'Usecases',
            href: '/#usecases',
          },
          {
            href: 'https://github.com/waku-org',
            position: 'right',
            className: 'header-github-link',
            title: 'Waku GitHub repository',
          },
        ],
      },
      footer: {
        copyright: 'Nimbus @2023<br/>All Rights Reserved.',
        links: [
          {
            items: [
              {
                href: 'https://twitter.com/ethnimbus',
                label: 'Twitter',
              },
              {
                href: 'https://discord.gg/EP8DZnXu9y',
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
                href: 'https://jobs.status.im/',
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
