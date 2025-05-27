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

        localSearch: {
          blogDir: 'rlog',
          blogRouteBasePath: '/rlog',
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
        copyright: 'Logos',
        links: [
          {
            items: [
              {
                href: '/events',
                label: 'Events',
              },
              {
                href: 'https://github.com/logos-co',
                label: 'Github',
              },
            ],
          },
          {
            items: [
              {
                href: 'https://boards.greenhouse.io/logos',
                label: 'Work with us',
              },
              {
                href: 'https://guide.logos.co/',
                label: 'Brand Guidelines',
              },
              {
                href: '/terms',
                label: 'Terms & conditions',
              },
              {
                href: '/privacy-policy',
                label: 'Privacy Policy',
              },
              {
                href: '/security',
                label: 'Security',
              },
            ],
          },
        ],
      },
    }),
}

module.exports = config
