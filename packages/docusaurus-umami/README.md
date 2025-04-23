# docusaurus-umami

A Docusaurus plugin for adding Umami Analytics to your site.

## Installation

```bash
npm install @acid-info/docusaurus-umami
# or
yarn add @acid-info/docusaurus-umami
```

## Usage

Add the plugin to your `docusaurus.config.js`:

```js
module.exports = {
  plugins: [
    [
      'docusaurus-umami',
      {
        websiteId: 'YOUR_WEBSITE_ID', // Required
        scriptSrc: 'https://analytics.yourdomain.com/script.js', // Required
        domains: 'yourdomain.com,anotherdomain.com', // Optional
      },
    ],
  ],
}
```
