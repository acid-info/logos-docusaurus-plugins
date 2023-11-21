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
          path: 'docs',
        },

        // Uncomment to fetch new generated data.
        /*
        generated: {
          challenges: {
            repoArray: [
              { owner: 'logos-co', repo: 'nomos-node' },
              { owner: 'logos-co', repo: 'nomos-specs' },
            ],
            githubAccessToken: process.env.GITHUB_ACCESS_TOKEN,
          },
          jobList: {
            jobBoard: 'waku',
          },
        },
        */
      }),
    ],
  ],

  plugins: [
    [
      '@acid-info/docusaurus-fathom',
      {
        siteId: 'TEST',
        scriptUrl: 'https://fathom.status.im/tracker.js',
        disabled: true,
        hostnames: ['localhost', 'waku.org'],
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
