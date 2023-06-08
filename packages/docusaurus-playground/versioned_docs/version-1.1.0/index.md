---
id: version-1.1.0-Introduction
title: Introduction
sidebar_position: 1
---

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

```tsx title="docusaurus.config.js"
module.exports = {
  // ...
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
      },
    ],
  ],
}
```

```tsx
import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

const Hello = () => {
  const { siteConfig } = useDocusaurusContext()
  const { title, tagline } = siteConfig

  return <div>{`${title} · ${tagline}`}</div>
}
```

:::note

The presets: **_ [['classic', {...}]] _** shorthand works as well.

:::

:::tip

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::info

The presets: **_ [['classic', {...}]] _** shorthand works as well.

:::

:::caution

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::danger

The presets: **_ [['classic', {...}]] _** shorthand works as well.

:::

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.

<details><summary>CLICK ME</summary>

#### yes, even hidden code blocks!

<br/>

```python
print("hello world!")
```

</details>
