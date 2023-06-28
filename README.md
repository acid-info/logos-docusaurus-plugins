- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Development Guides](#development-guides)
  - [Run locally](#run-locally)
  - [Versioning](#versioning)
- [Packages](#packages)
- [TODO](#todo)

# Description

This monorepo contains a set of [Docusaurus 2](https://docusaurus.io/) plugins and themes developed for Logos documentation websites.

# Installation

Clone this repository and install the dependencies by running the following:

```bash
$ yarn
```

# Usage

Clone our ready-to-use [Docusaurus template](https://github.com/acid-info/logos-documentation-website-template).

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

2. Start the playground website:

```bash
$ yarn start
```

## Versioning

We use semantic versioning; all you need to do is commit your changes and then run the following command:

```bash
$ yarn lerna version --no-private
```

# Packages

- **Presets**

  - [Logos Preset](./packages/logos-docusaurus-preset) [![Npm Version](https://img.shields.io/npm/v/@acid-info/logos-docusaurus-preset)](https://www.npmjs.com/package/@acid-info/logos-docusaurus-preset)

- **Plugins**

  - [Logos Search Local](./packages/logos-docusaurus-search-local) [![Npm Version](https://img.shields.io/npm/v/@acid-info/logos-docusaurus-search-local)](https://www.npmjs.com/package/@acid-info/logos-docusaurus-search-local)

  - [Docusaurus OG](./packages/docusaurus-og) [![Npm Version](https://img.shields.io/npm/v/@acid-info/docusaurus-og)](https://www.npmjs.com/package/@acid-info/docusaurus-og)

  - [Docusaurus Fathom](./packages/docusaurus-fathom) [![Npm Version](https://img.shields.io/npm/v/@acid-info/docusaurus-fathom)](https://www.npmjs.com/package/@acid-info/docusaurus-fathom)

- **Themes**
  - [Logos Theme](./packages/logos-docusaurus-theme) [![Npm Version](https://img.shields.io/npm/v/@acid-info/logos-docusaurus-theme)](https://www.npmjs.com/package/@acid-info/logos-docusaurus-theme)

# TODO

- [ ] Automate publishing
- [ ] Add unit testing
- [x] Optimize [Logos theme](./packages/logos-docusaurus-theme)'s watch command
