- [Overview](#overview)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Website Configuration](#website-configuration)
    - [Custom Website Settings](#custom-website-settings)
  - [Supported Themes](#supported-themes)
  - [OpenGraph Image Generator](#opengraph-image-generator)
  - [Local Search](#local-search)
  - [Generated Files](#generated-files)
    - [Job Openings](#job-openings)
  - [Docs Plugin](#docs-plugin)
  - [Pages Plugin](#pages-plugin)
  - [Blog Plugin](#blog-plugin)

## Overview

The Logos Docusaurus preset simplifies the creation of Docusaurus websites with the Logos theme and plugins, tailored to your business unit. This preset offers:

- A stunning and responsive Logos theme that showcases your brand identity and content.
- A local search feature for quick and easy information retrieval.
- An OpenGraph image generator for captivating social media sharing.
- Pre-configured website setup, including metadata, logos, and favicons for your business unit.

## Installation

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

## Configuration

### Website Configuration

This preset provides a set of predefined website settings and assets for each of Logos’ business units. You can select your business unit of choice, and the preset will automatically apply the relevant settings and assets to your website.

To use this feature, add the preset to your docusaurus.config.js file as shown below:

```js
// docusaurus.config.js
[
  '@acid-info/logos-docusaurus-preset',
  /** @type {import('@acid-info/logos-docusaurus-preset').PluginOptions} */
  ({
    businessUnit: 'Logos',
  }),
],
```

Possible options for `businessUnit` include:

- `Logos`
- `Codex`
- `Waku`
- `Nimbus`
- `Nomos`
- `VacResearch`
- `Acid.info`

#### Custom Website Settings

The preset overrides certain website settings in your docusaurus.config.js file. These settings include:

`title`
`tagline`
`url`
`favicon`
`onBrokenLinks`
`onBrokenMarkdownLinks`

By default, the preset sets these values to be specific to your chosen business unit. You can find the default values for each business unit in the [site-config](./src/site-config/) directory.

If you wish to retain your own custom settings, you can set the `customSiteConfig` option to `true` in your configuration:

```js
// docusaurus.config.js
title: "Custom Title",
tagline: "Custom Tagline",
url: "https://custom.url",
favicon: "img/favicon.ico",
onBrokenLinks: "throw",
onBrokenMarkdownLinks: "warn",

presets: [
  [
    '@acid-info/logos-docusaurus-preset',
    /** @type {import('@acid-info/logos-docusaurus-preset').PluginOptions} */
    ({
      businessUnit: 'Logos',
      customSiteConfig: true
    }),
  ],
],
```

### Supported Themes

You have the flexibility to choose the theme that best suits your website. The Logos Docusaurus preset supports the following themes:

`default` - Logos theme (default and recommended)
`docusaurus-default` - Docusaurus classic theme

Example:

```js
// docusaurus.config.js

presets: [
  [
    '@acid-info/logos-docusaurus-preset',
    /** @type {import('@acid-info/logos-docusaurus-preset').PluginOptions} */
    ({
      businessUnit: 'Logos',
      theme: {
        name: 'default',
        options: {
          // theme options
        }
      }
    }),
  ],
],
```

For theme configuration options:

- **Logos Theme Options**: Please refer to the [Logos theme documentation](../logos-docusaurus-theme/README.md#theme-options)
- **Docusaurus Classic Theme Options**: Please refer to the [Docusaurus documentation](https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic#configuration).

### OpenGraph Image Generator

The Logos Docusaurus preset includes the [Docusaurus OG](../docusaurus-og/) plugin, which enables you to create visually appealing OpenGraph images for your website's pages. These images are essential for making your content stand out when shared on social media platforms.

To activate the OpenGraph image generator, you can include the `og` option in the preset settings in your `docusaurus.config.js`:

```js
// docusaurus.config.js
presets: [
  [
    '@acid-info/logos-docusaurus-preset',
    /** @type {import('@acid-info/logos-docusaurus-preset').PluginOptions} */
    ({
      businessUnit: 'Logos',
      og: {
        path: '_og' // optional; defaults to '_og' (relative to the .docusaurus directory)
      }
    }),
  ],
],
```

> [!WARNING]
> The Logos Docusaurus preset includes the [Docusaurus OG](../docusaurus-og/) plugin, which is designed for compatibility with the Logos theme. If you prefer using the Docusaurus classic theme or a custom theme, you'll need to create your own image renderer. For detailed instructions on how to create an image renderer for Docusaurus, please refer to [this guide](../docusaurus-og/).

> [!NOTE]
> For in-depth insights into the generation of OpenGraph images, utilizing custom images, and disabling the plugin for specific pages, please visit [this page](../logos-docusaurus-theme/README.md#opengraph-image-generator).

### Local Search

The Logos Docusaurus preset also includes the [@acid-info/docusaurus-search-local](../docusaurus-search-local/) plugin, providing an essential feature for your website—local search. With local search, your users can quickly and efficiently find relevant information directly on your website.

You can customize the behavior of the search feature by adding the `localSearch` option to the preset settings in your `docusaurus.config.js`:

```js
presets: [
  [
    '@acid-info/logos-docusaurus-preset',
    /** @type {import('@acid-info/logos-docusaurus-preset').PluginOptions} */
    ({
      businessUnit: 'Logos',
      localSearch: {
        singleIndex: true, // optional; defaults to false - if true, user can search across all Docusaurus plugin instances
      }
    }),
  ],
],
```

To learn more on how the plugin works, please visit the [plugin documentation](../docusaurus-search-local/README.md).

### Generated Files

#### Job Openings

Use the `generated.jobList` option to fetch job openings from the Greenhouse API for a specific job board. Each time you run `yarn start` or `yarn build`, the plugin will fetch the latest job openings from the Greenhouse API and generate a JSON file containing the job openings for the specified job board. The generated file will be located at `static/generated/jobs.json`.

```js
presets: [
  [
    '@acid-info/logos-docusaurus-preset',
    /** @type {import('@acid-info/logos-docusaurus-preset').PluginOptions} */
    ({
      businessUnit: 'Logos',
      generated: {
        jobList: {
          jobBoard: 'your-job-board-id',
        },
      },
    }),
  ],
],
```

You can import the generated file in your website's code and use it to display the job openings. For example, you can use the `JobsPerDepartment` component from the [Logos theme](../logos-docusaurus-theme/README.md#jobsperdepartment) to display the job openings per department.

### Docs Plugin

The Docs plugin (Official Docusaurus Docs Plugin) is enabled by default and simplifies the creation and management of documentation on your website. To disable this plugin, set `docs` to `false` in your preset configuration.

For detailed configuration and usage guidance, refer to the [official Docusaurus Docs plugin documentation](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs).

### Pages Plugin

The Pages plugin (Official Docusaurus Pages Plugin) is enabled by default and offers versatility when creating standalone pages on your website. To disable this plugin, set `pages` to `false` in your preset configuration.

For detailed configuration and usage guidance, refer to the [official Docusaurus Pages plugin documentation](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages).

### Blog Plugin

The Blog plugin (Official Docusaurus Blog Plugin) is enabled by default, making it easy to add a blog section to your website. To disable this plugin, set `blog` to `false` in your preset configuration.

For configuration and usage instructions, refer to the [official Docusaurus Blog plugin documentation](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog).
