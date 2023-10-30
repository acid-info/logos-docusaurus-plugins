# Docusaurus Fathom Plugin

The Docusaurus Fathom Plugin seamlessly integrates your Docusaurus website with Fathom Analytics.

## Usage

1. Install the plugin:

```bash
yarn add @acid-info/docusaurus-fathom

# or
npm install @acid-info/docusaurus-fathom
```

2. Add the plugin to your `docusaurus.config.js`:

```javascript
plugins: [
  [
    '@acid-info/docusaurus-fathom',
    {
      siteId: 'your-site-id',
      scriptUrl: 'https://your-fathom-instance.com/script.js',
      hostnames: ['mywebsite.com', 'staging.mywebsite.com'],
    },
  ],
]
```

## Configuration

**`siteId`**

- **Type**: `string` (required)
- **Description**: Your Fathom Analytics site ID.

**`scriptUrl`**

- **Type**: `string` (required)
- **Description**: this URL is used for downloading and injecting the Fathom script into your website.

**`hostnames`**

- **Type**: `string[]` (optional)
- **Default**: `[]`
- **Example**: `['mywebsite.com', 'staging.mywebsite.com']`
- **Description**: A whitelist of hostnames where the Fathom script will be loaded and pageview tracking will occur. If you want the plugin to work on any hostname, you can leave this option empty or omit it from the configuration.
