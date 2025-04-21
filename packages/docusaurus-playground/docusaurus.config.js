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
        businessUnit: 'Nimbus',
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
          id: 'root-pages',
          routeBasePath: '/',
          path: 'root-pages',
        },
        og: {},

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
    [
      '@docusaurus/plugin-content-blog',
      /** @type {import('@docusaurus/plugin-content-blog').PluginOptions} */
      ({
        id: 'blog',
        routeBasePath: '/rlog',
        path: 'rlog',
        blogTitle: 'Research Blog',
        blogSidebarCount: 0,
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs',
        routeBasePath: '/about',
        path: 'docs',
      },
    ],
  ],

  themeConfig:
    /** @type {import('@acid-info/logos-docusaurus-preset').ThemeConfig} */
    ({
      colorMode: {
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
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
            label: 'Blog',
            to: '/rlog',
          },
          {
            label: 'Community',
            href: '/community',
          },
          {
            label: 'Specs',
            href: '/specs',
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
        copyright: 'Waku',
        links: [
          {
            items: [
              {
                href: 'https://twitter.com/waku_org',
                label: 'Twitter',
              },
              {
                href: 'https://discord.waku.org/',
                label: 'Discord',
              },
              {
                href: 'https://www.youtube.com/@waku-org',
                label: 'YouTube',
              },
              {
                href: 'https://www.linkedin.com/company/waku-org',
                label: 'LinkedIn',
              },
              {
                href: 'https://warpcast.com/waku',
                label: 'Farcaster',
              },
              {
                href: 'https://t.me/waku_org',
                label: 'Telegram',
              },
            ],
          },
          {
            items: [
              {
                href: 'https://docs.waku.org',
                label: 'Docs',
              },
              {
                href: 'https://github.com/waku-org',
                label: 'GitHub',
              },
            ],
          },
          {
            items: [
              {
                to: '/join-us',
                label: 'Work with Us',
              },
              {
                href: 'https://guide.waku.org/',
                label: 'Brand Guidelines',
              },
            ],
          },
          {
            items: [
              {
                href: '/terms',
                label: 'Terms of Use',
              },
              {
                href: '/privacy-policy',
                label: 'Privacy Policy',
              },
              {
                href: '/rules-of-engagement',
                label: 'Rules of Engagement',
              },
            ],
          },
        ],
      },
    }),
}

module.exports = config
