# Logos Docusaurus Plugins

This monorepo contains a set of [Docusaurus 2](https://docusaurus.io/) plugins and themes developed for Logos websites.

# Package Breakdowns

- **Presets**

  - [logos-docusaurus-preset](./packages/logos-docusaurus-preset) [![Npm Version](https://img.shields.io/npm/v/@acid-info/logos-docusaurus-preset)](https://www.npmjs.com/package/@acid-info/logos-docusaurus-preset) : Docusaurus preset, including site configuration, theme configuration, business unit types, etc.

- **Plugins**

  - [logos-docusaurus-search-local](./packages/logos-docusaurus-search-local) [![Npm Version](https://img.shields.io/npm/v/@acid-info/logos-docusaurus-search-local)](https://www.npmjs.com/package/@acid-info/logos-docusaurus-search-local) : Plugin for local search

  - [docusaurus-og](./packages/docusaurus-og) [![Npm Version](https://img.shields.io/npm/v/@acid-info/docusaurus-og)](https://www.npmjs.com/package/@acid-info/docusaurus-og) : Plugin for OG images

  - [docusaurus-fathom](./packages/docusaurus-fathom) [![Npm Version](https://img.shields.io/npm/v/@acid-info/docusaurus-fathom)](https://www.npmjs.com/package/@acid-info/docusaurus-fathom) : Plugin for [Fathom Analytics](https://github.com/usefathom/fathom)

- **Themes**

  - [logos-docusaurus-theme](./packages/logos-docusaurus-theme) [![Npm Version](https://img.shields.io/npm/v/@acid-info/logos-docusaurus-theme)](https://www.npmjs.com/package/@acid-info/logos-docusaurus-theme) : Docusaurus theme for Logos documentation websites, extending [@docusaurus/theme-classic](https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic)

- **Playground**
  - [docusaurus-playground](https://github.com/acid-info/logos-docusaurus-plugins/tree/main/packages/docusaurus-playground) : A playground for developing theme, preset, and plugins

# Use Cases

Clone our ready-to-use Docusaurus template, which utilizes the themes and plugins from this repository.

- [logos-homepage-template](https://github.com/acid-info/logos-homepage-template)

  - Example: [nomos.tech](https://nomos.tech/)

- [logos-docs-template](https://github.com/acid-info/logos-docs-template)

  - Example: [docs.codex.storage](https://docs.codex.storage/)

- [logos-blog-template](https://github.com/acid-info/logos-blog-template)
  - Example: [vac.dev Research Log](https://vac.dev/rlog/)

# Development Guides

## Run locally

To make the development easier and to remove the need to locally link an external repository to the packages in this project, we've created a playground Docusaurus website which can be found in `packages/docusaurus-playground`.

[Lerna](https://lerna.js.org/) will handle linking the packages; however, if you want to use them in another project, you should use tools like [yarn link](https://classic.yarnpkg.com/en/docs/cli/link) or [yalc](https://github.com/wclr/yalc); but please be careful not to commit changes made by these tools.

1. Install dependencies and link packages together:

```bash
$ yarn && yarn bootstrap
```

2. Build packages:

```bash
$ yarn build

# or build and watch for changes

$ yarn watch
```

3. Open another terminal and start the playground website:

```bash
$ yarn start
```

The playground supports hot-reloading for updates to themes and plugins.

If hot-reloading for a specific package does not work, you can use `yarn workspace {package-name} watch` as shown below.

```bash
yarn workspace @acid-info/logos-docusaurus-theme watch
```

# Configuration

## Docusaurus Config

Update [docusaurus.config.js](https://github.com/acid-info/logos-docusaurus-plugins/blob/main/packages/docusaurus-playground/docusaurus.config.js) according to the [Docusaurus Guidelines](https://docusaurus.io/docs/next/api/docusaurus-config) and preset

### 1. Business Unit

Update the value of the `businessUnit` field in the presets section. You can find a list of valid values [here](https://github.com/acid-info/logos-docusaurus-plugins/blob/main/packages/logos-docusaurus-preset/src/types/preset.ts) within the BusinessUnits.

Example:

```js
presets: [
  [
    '@acid-info/logos-docusaurus-preset',
    {
      businessUnit: 'Codex',
    },
  ],
],
```

### 2. Navbar and Footer

The content in the Navbar and Footer can be defined through `themeConfig` in `docusaurus.config.js`.

Example:

```js
themeConfig:
  /** @type {import('@acid-info/logos-docusaurus-preset').ThemeConfig} */
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
        type: 'localeDropdown',
        position: 'right',
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
        ],
      },
      {
        items: [
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
  ...
```

### 3. Docs Setup

You can configure the docs page (e.g., `routeBasePath`, `path`) based on the [Docusaurus Configuration](https://docusaurus.io/docs/configuration)

Example:

```js
presets: [
  [
    '@acid-info/logos-docusaurus-preset',
    /** @type {import('@acid-info/logos-docusaurus-preset').PluginOptions} */
    ({
      businessUnit: 'Codex',
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
        routeBasePath: '/', // the index.md becomes the index page
      },
      og: {},
    }),
  ],
]
```

The content in `index.md` in the docs directory (or other directory based on `routeBasePath`) will serve as the root page for your documentation.

### 4. Blog Setup

The blog utilizes the Docusaurus blog plugin configured in `docusaurus.config.js`. For customization options, please refer to the [Docusaurus Blog Plugin documentation](https://docusaurus.io/docs/blog).

Example:

```js
;[
  '@docusaurus/plugin-content-blog',
  /** @type {import('@docusaurus/plugin-content-blog').PluginOptions} */
  ({
    id: 'blog',
    routeBasePath: '/',
    path: 'posts',
    blogTitle: 'Research Log',
    blogSidebarCount: 0,
    authorsMapPath: 'authors.yml',
    remarkPlugins: [math],
    rehypePlugins: [katex],
  }),
]
```

A list of authors can be defined in `authors.yml`.

### 5. Landing page and subpages

The code for a landing page is located in `src/pages/index.mdx`. This file employs the `mdx` format and utilizes React components from the [Logos Docusaurus Plugins](https://github.com/acid-info/logos-docusaurus-plugins/tree/main/packages/logos-docusaurus-theme/src/client/components/mdx) package.

To include subpages (e.g., https://nomos.tech/about/architect), create a `.md` or `.mdx` file within the `docs` or `about` directory, based on the `routeBasePath` defined in the `docusaurus.config.js`.

You can also use [Frontmatter](https://docusaurus.io/docs/markdown-features#front-matter) to add metadata to your markdown file.

The content in `about/index.md` will serve as the index page for the `/about` section.

## Logos Docusaurus Package Plugins

Check out how to use docusaurus plugins [here](https://docusaurus.io/docs/using-plugins), and update `docusaurus.config.js` based on the plugin you want to use.

- logos-docusaurus-search-local Example:

```js
plugins: [
  [
    "@easyops-cn/docusaurus-search-local",
    {
      hashed: true,
      indexDocs: true,
      indexPages: true
    }
  ]
],
```

- docusaurus-fathom Example

```js
plugins: [
 [
    '@acid-info/docusaurus-fathom',
    {
      siteId: 'BBYCC',
      scriptUrl: 'https://fathom.status.im/tracker.js',
    },
  ],
],
```

## Versioning

We use semantic versioning; all you need to do is commit your changes and then run the following command:

```bash
$ yarn lerna version --no-private
```

# TODO

- [ ] Automate publishing
- [ ] Add unit testing
- [x] Optimize [Logos theme](./packages/logos-docusaurus-theme)'s watch command
