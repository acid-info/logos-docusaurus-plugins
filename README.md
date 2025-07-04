# Logos Docusaurus Plugins

- [Overview](#overview)
- [Quick start](#quick-start)
  - [Use a template](#use-a-template)
  - [Use with an existing Docusaurus website:](#use-with-an-existing-docusaurus-website)
  - [Use the playground](#use-the-playground)
- [Next steps](#next-steps)
  - [Working on content](#working-on-content)
  - [Configuration](#configuration)
  - [Become a contributor](#become-a-contributor)
- [Packages](#packages)
- [License](#license)

## Overview

This repository contains a set of Docusaurus 2 plugins and themes, initially crafted for Logos websites but versatile enough for use with any Docusaurus website. The collection includes a headless local search, OG image generation, and Fathom Analytics plugins.

## Quick start

### Use a template

Kickstart your website creation with our ready-to-use templates. Choose a template that fits your needs, whether it's a documentation, a blog, or a complete website.

1. Choose a template:

- [Website Template](https://github.com/acid-info/logos-website-template)
- [Documentation Website Template](https://github.com/acid-info/logos-documentation-website-template)
- [Blog Template](https://github.com/acid-info/logos-blog-template)

2. Clone your selected template:

```bash
# Example: Create a website with a landing page
git clone https://github.com/acid-info/logos-homepage-template.git my-website && cd my-website

# Example: Create a documentation website
git clone https://github.com/acid-info/logos-documentation-website-template.git my-website && cd my-website

# Example: create a blog
git clone https://github.com/acid-info/logos-blog-template.git my-website && cd my-website
```

3. Install the dependencies:

```bash
yarn install
```

4. Run your new website locally:

```bash
yarn start
```

### Use with an existing Docusaurus website:

1. Install the [Logos Docusaurus preset](./packages/logos-docusaurus-preset/):

```bash
yarn add @acid-info/logos-docusaurus-preset
```

2. Add the preset to your `docusaurus.config.js`:

```js
presets: [
    [
      '@acid-info/logos-docusaurus-preset',
      /** @type {import('@acid-info/logos-docusaurus-preset').PluginOptions} */
      ({
        businessUnit: 'Logos',
      }),
    ],
  ],

```

### Use the playground

A playground located in the `packages/docusaurus-playground` of this repository can be used to test the plugins and themes locally.

1. Clone the repository:

```bash
git clone https://github.com/acid-info/logos-docusaurus-plugins.git
```

2. Install the dependencies:

```bash
yarn install && yarn link

yarn build
```

3. Run the playground:

```bash
yarn start
yarn watch
yarn workspace @acid-info/logos-docusaurus-theme watch
```

## Next steps

### Working on content

Our plugins work smoothly with standard Docusaurus features, which you can use to manage and organize content. Learn more on the [Docusaurus website](https://docusaurus.io/docs). For practical guidance on dealing with common use cases, visit our dedicated [Wiki pages](https://github.com/acid-info/logos-docusaurus-plugins/wiki).

### Configuration

While it's possible to install and configure our plugins and themes individually, we highly recommend using the [Logos Docusaurus preset](./packages/logos-docusaurus-preset/) for a simplified installation. This preset establishes a default configuration for the plugins and theme and automatically incorporates essential website metadata, logos, and favicons for the selected business unit. For detailed configuration information, please refer to the README file of each package.

### Become a contributor

We welcome any kind of contribution, such as reporting issues, suggesting features, writing documentation or fixing bugs. Please read our [contributing guidelines](./CONTRIBUTING.md) on how to get started.

## Packages

- **Presets**

  - [Logos Preset](./packages/logos-docusaurus-preset) - A Docusaurus preset for Logos websites.
    [![Npm Version](https://img.shields.io/npm/v/@acid-info/logos-docusaurus-preset)](https://www.npmjs.com/package/@acid-info/logos-docusaurus-preset)

- **Plugins**

  - [Logos Search Local](./packages/logos-docusaurus-search-local) - Headless local search engine for Docusaurus.
    [![Npm Version](https://img.shields.io/npm/v/@acid-info/logos-docusaurus-search-local)](https://www.npmjs.com/package/@acid-info/logos-docusaurus-search-local)

  - [Docusaurus OG](./packages/docusaurus-og) - OpenGraph image generator for Docusaurus.
    [![Npm Version](https://img.shields.io/npm/v/@acid-info/docusaurus-og)](https://www.npmjs.com/package/@acid-info/docusaurus-og)

  - [Docusaurus Fathom](./packages/docusaurus-fathom) - Fathom Analytics plugin for Docusaurus.
    [![Npm Version](https://img.shields.io/npm/v/@acid-info/docusaurus-fathom)](https://www.npmjs.com/package/@acid-info/docusaurus-fathom)

- **Themes**

  - [Logos Theme](./packages/logos-docusaurus-theme) - A customized version of Docusaurus classic theme built with [LSD](https://github.com/acid-info/lsd).
    [![Npm Version](https://img.shields.io/npm/v/@acid-info/logos-docusaurus-theme)](https://www.npmjs.com/package/@acid-info/logos-docusaurus-theme)

-
