# Docusaurus OG

Docusaurus OG enables you to automate the generation of custom OpenGraph (OG) images for your Docusaurus website, enhancing the visual representation of your content when shared on social media and other platforms.

This plugin leverages [Vercel's Satori](https://github.com/vercel/satori) to convert your HTML and CSS into images. It lets you define image renderers tailored to each Docusaurus content plugin, allowing you to create unique OG images for your website's content.

## Installation

To get started, simply follow these steps:

1. Install the plugin:

```bash
yarn add @acid-info/docusaurus-og

# or

npm install @acid-info/docusaurus-og
```

2. Integrate the plugin into your `docusaurus.config.js`:

```js
plugins: [
  [
    '@acid-info/docusaurus-og',
    {
      path: './preview-images', // relative to the build directory
      imageRenderers: {},
    },
  ],
]
```

3. Define your image renderers for the content plugins of your choice. Here's an example:

```js
imageRenderers: {
  'docusaurus-plugin-content-docs': require('./lib/ImageRenderers').docs,
  'docusaurus-plugin-content-pages': require('./lib/ImageRenderers').pages,
  'docusaurus-plugin-content-blog': require('./lib/ImageRenderers').blog,
}
```

## Create an Image Renderer

An image renderer is a function that receives a `data` object representing page data and a `context` object representing the Docusaurus context. This function returns HTML or JSX content, which serves as input for Satori, the image generation tool. Satori processes this content to produce the corresponding OpenGraph image.

For example, here's an image renderer for the `@docusaurus/plugin-content-docs` plugin:

```tsx
// src/ImageRenderers.tsx
import type { DocsPageData, ImageRenderer } from '@acid-info/docusaurus-og'
import { readFileSync } from 'fs'
import { join } from 'path'
import React from 'react'

export const docs: ImageRenderer<DocsPageData> = (data, context) => [
  <div style={{ display: 'flex', background: 'black', color: 'white' }}>
    {data.metadata.title}
  </div>,
  {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: readFileSync(
          join(__dirname, '../../static/Inter/Inter-Regular.ttf'),
        ),
        weight: 400,
        style: 'normal',
      },
    ],
  },
]
```

### JSX Support

If you wish to use JSX within your image renderer, you'll need to compile your code to JavaScript. Here's a TypeScript example:

1. Create a `tsconfig.client.json` file in your project root to compile your `src` directory:

```json
// tsconfig.client.json
{
  "compilerOptions": {
    "noEmit": false,
    "composite": true,
    "incremental": true,
    "esModuleInterop": true,
    "tsBuildInfoFile": "./lib/.tsbuildinfo-client",
    "rootDir": "src",
    "outDir": "lib",
    "module": "CommonJS",
    "target": "esnext",
    "jsx": "react",
    "types": ["node"],
    "baseUrl": "./",
    "lib": ["DOM"]
  },
  "include": ["src"]
}
```

2. Add `prestart` and `prebuild` scripts to your `package.json`:

```json
// package.json
{
  "scripts": {
    "prestart": "tsc --project tsconfig.client.json",
    "prebuild": "tsc --project tsconfig.client.json"
  }
}
```

3. Exclude the `lib` directory from your version control by adding it to your `.gitignore` file:

```bash
echo "lib" >> .gitignore
```

4. Import your image renderer from the `lib` directory:

```js
plugins: [
  [
    '@acid-info/docusaurus-og',
    {
      path: './preview-images', // relative to the build directory
      imageRenderers: {
        'docusaurus-plugin-content-docs': require('./lib/ImageRenderers').docs,
        'docusaurus-plugin-content-pages': require('./lib/ImageRenderers')
          .pages,
        'docusaurus-plugin-content-blog': require('./lib/ImageRenderers').blog,
      },
    },
  ],
]
```
