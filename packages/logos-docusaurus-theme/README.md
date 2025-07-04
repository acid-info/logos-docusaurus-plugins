- [Logos Docusaurus Theme](#logos-docusaurus-theme)
  - [Installation](#installation)
    - [Using the Logos Docusaurus Preset (Recommended)](#using-the-logos-docusaurus-preset-recommended)
    - [Standalone Installation](#standalone-installation)
  - [Theme Options](#theme-options)
  - [Customization Guides](#customization-guides)
    - [Customizing the Footer Links](#customizing-the-footer-links)
  - [OpenGraph Image Generator](#opengraph-image-generator)
    - [How the Renderer Works:](#how-the-renderer-works)
    - [Using a Custom Image:](#using-a-custom-image)
    - [How to Disable the Image Generator for a Specific Page:](#how-to-disable-the-image-generator-for-a-specific-page)
  - [MDX Components](#mdx-components)
    - [AppCard](#appcard)
    - [AssetCard](#assetcard)
    - [Box](#box)
    - [CallToActionButton](#calltoactionbutton)
    - [CallToActionSection](#calltoactionsection)
    - [ExternalResourceCard](#externalresourcecard)
    - [FeatureList](#featurelist)
    - [Hero](#hero)
    - [JobsPerDepartment](#jobsperdepartment)
    - [PageCard](#pagecard)
    - [ProfileCard](#profilecard)
    - [SocialCard](#socialcard)
    - [TimelineItem](#timelineitem)

# Logos Docusaurus Theme

The Logos theme is a Docusaurus theme tailored for Logos websites built with [LSD](https://github.com/acid-info/lsd), designed to align with Logos branding guidelines.

## Installation

### Using the Logos Docusaurus Preset (Recommended)

The recommended way to install the Logos Docusaurus Theme is by utilizing the Logos Docusaurus Preset. The preset simplifies the installation process by injecting essential assets, data, and configurations to ensure the theme functions seamlessly.

To install the Logos Docusaurus Preset, please refer to the [Logos Docusaurus Preset Installation Instructions](../logos-docusaurus-preset/README.md#installation).

### Standalone Installation

If you prefer to install the Logos Docusaurus Theme on its own without the entire preset, follow these steps:

> [!WARN]
> The theme was primarily designed to work seamlessly with the Logos Docusaurus Preset. Standalone installations may not provide the expected functionality.

1. Install the theme:

```bash
yarn add @acid-info/logos-docusaurus-theme

# or

npm i @acid-info/logos-docusaurus-theme
```

2. Add the Logos theme to your `docusaurus.config.js` file. Here's an example:

```js
// docusaurus.config.js
module.exports = {
  // ...
  themes: [
    [
      '@acid-info/logos-docusaurus-theme',
      /** @type {import('@acid-info/logos-docusaurus-theme').ThemeOptions} */
      (
        {
          // theme options
        }
      ),
    ],
  ],
}
```

## Theme Options

**`customCss`**

- _Type_: `string[] | string`
- _Default_: `[]`
- _Description_: The `customCss` option allows you to specify the path of custom CSS files to be added to your website. For more details, refer to the [Docusaurus documentation](https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic#configuration).

**`typography`**

- _Type_: `Object`
- _Default_: `{ genericFontFamily: 'sans-serif' }`
- _Description_: The `typography` option allows you to define global typography styles applied to your website. Here are the available settings:
- - `genericFontFamily`: Choose from `'sans-serif'`, `'serif'`, or `'monospace'` to set the default typeface of your website.

**`docs`**

- _Type_: `Object`
- _Default_: `{}`
- _Description_: The `docs` option is used to configure how the Logos theme behaves on all documentation pages of a specific `@docusaurus/plugin-content-docs` plugin instance. Each plugin instance has a unique ID, which you can use as the key in a map. The value of each key represents the options for that plugin instance. The following option is available:

  - `sidebar.hide`: Set this value to `true` to hide the navigation sidebar on all pages of the specified plugin instance. This can be useful when you want to create root pages like `/terms` and avoid displaying the sidebar for a cleaner and more focused layout on those specific pages.

Here's a full example of how to configure the `default` theme in your `docusaurus.config.js`:

```javascript
// docusaurus.config.js
{
  name: 'default',
  options: {
    customCss: [require.resolve('./src/css/custom.scss')],
    typography: {
      genericFontFamily: 'monospace' // sets the default typeface of your website to monospace
    },
    docs: {
      // the key is the ID of the plugin instance
      default: {
        sidebar: {
          hide: true // hides the navigation sidebar on all pages of the default plugin instance
        }
      }
    }
  }
}
```

## Customization Guides

### Customizing the Footer Links

When customizing the footer links in your Docusaurus website, it's essential to understand the theme's predefined structure for organizing these links. The footer is divided into groups, and each group contains a simple list of items. Each group of links will be displayed as a row of links in the footer. Here's an example of the structure you can use in your `docusaurus.config.js` (`themeConfig` section):

```js
// docusaurus.config.js (themeConfig)
footer: {
  links: [
    {
      items: [
        {
          href: 'https://twitter.com/handle',
          label: 'Twitter',
        },
        {
          href: 'https://discord.gg/server',
          label: 'Discord',
        },
        {
          href: '/',
          label: 'Docs',
        },
        {
          href: 'https://github.com/org-name',
          label: 'Github',
        },
      ],
    },
    {
      items: [
        {
          href: '/',
          label: 'Contact us',
        },
        {
          href: '/jobs',
          label: 'Work with us',
        },
        {
          href: '/terms',
          label: 'Privacy policy',
        },
        {
          href: '/terms',
          label: 'Terms & conditions',
        },
      ],
    },
  ],
}
```

## OpenGraph Image Generator

This theme provides an image renderer for the [Docusaurus OG](../docusaurus-og/) plugin, which enables you to automatically generate visually appealing OpenGraph images for your website's pages. These images are essential for making your content stand out when shared on social media platforms.

### How the Renderer Works:

The OpenGraph image generator in this theme works by automatically creating images based on the content and metadata of your website. It dynamically generates images for all of your website pages including blog posts. This ensures that when someone shares a link to your site, it will have an eye-catching image associated with it.

### Using a Custom Image:

By default, the renderer will embed your custom image within the generated OpenGraph image. This allows you to enhance your custom image with specific branding, logos, or additional information. To use a custom image, add the following frontmatter to the page's Markdown file:

```yaml
image: /path/to/custom-image.png
```

If you prefer to use your own image and disable the renderer, please see the next section.

### How to Disable the Image Generator for a Specific Page:

You can disable the image generator for a specific page by adding the following frontmatter to the page's Markdown file:

```yaml
og:image_generator: false
```

## MDX Components

Elevate your MDX-powered landing pages with our MDX components. Craft stunning Hero sections, showcase a list of features, entice visitors with diverse Call to Action sections, lay out your roadmap, introduce your dedicated team, and gather user endorsements for an engaging user experience.

### AppCard

A card component for displaying information about an app.

**Props**

| Prop Name   | Type           | Required | Default | Description                                 |
| ----------- | -------------- | -------- | ------- | ------------------------------------------- |
| logoSrc     | string         | false    |         | The source URL for the light logo image     |
| logoSrcDark | string         | false    |         | The source URL for the dark logo image      |
| name        | ReactReactNode | false    |         | The name of the app                         |
| description | ReactReactNode | false    |         | The description of the app                  |
| link        | string         | false    |         | The URL to link to when the card is clicked |
| linkLabel   | string         | false    |         | The label for the link to the app           |

**Example usage:**

```jsx
import { AppCard } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
;<AppCard
  name="Status"
  link="https://status.im"
  linkLabel="Visit Status"
  logoSrc="/img/status-mark-white.svg"
  description="Waku powers many of the Status super app's features, including its private messaging."
/>
```

**Grid example:**

```jsx
import {
  Grid,
  AppCard,
} from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
;<Grid xs={{ cols: 1, wrap: true, gap: '0 1rem' }} lg={{ cols: 2 }}>
  <Grid.Item xs={1}>
    <AppCard
      name="Status"
      description="Waku powers many of the Status super app's features, including its private messaging."
      logoSrc="/img/status-mark-black.svg"
      logoSrcDark="/img/status-mark-white.svg"
      link="https://status.im"
    />
  </Grid.Item>
  <Grid.Item xs={1}>
    <AppCard
      name="Status"
      description="Waku powers many of the Status super app's features, including its private messaging."
      logoSrc="/img/status-mark-black.svg"
      logoSrcDark="/img/status-mark-white.svg"
      link="https://status.im"
    />
  </Grid.Item>
</Grid>
```

### AssetCard

A card component with an image preview and download buttons.

**Props**

| Prop Name     | Type           | Required | Default | Description                                                                                                                          |
| ------------- | -------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| title         | ReactReactNode | false    |         | The title of the asset                                                                                                               |
| previewSrc    | string         | true     |         | The source URL for the preview image                                                                                                 |
| forceDownload | boolean        | false    | false   | Whether to force download the asset when clicking on the preview image (default: false); if false, the asset might open in a new tab |
| downloadable  | Array          | false    |         | The list of downloadable assets                                                                                                      |

**Example usage:**

```jsx
import { AssetCard } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
;<AssetCard
  title="Logo"
  previewSrc="/img/logo.svg"
  downloadable={[
    { src: '/img/logo.svg', title: 'SVG' },
    { src: '/img/logo.png', title: 'PNG' },
  ]}
/>
```

### Box

A box component that can be used to add top and bottom margins with breakpoints.
**Props**

| Prop Name | Type                               | Required | Default | Description |
| --------- | ---------------------------------- | -------- | ------- | ----------- |
| top       | BreakpointsStyle<number> \| number | false    | 0       |             |
| bottom    | BreakpointsStyle<number> \| number | false    | 0       |             |
| style     | undefined                          | false    | {}      | undefined   |

```tsx
import { Box } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
;<Box top={{ xs: 10, md: 20 }} bottom={30}>
  <p>This is some content inside the box.</p>
</Box>
```

### CallToActionButton

A call-to-action button that can be used in MDX pages.

**Props**

| Prop Name | Type                   | Required | Default  | Description                                   |
| --------- | ---------------------- | -------- | -------- | --------------------------------------------- | ---------------------- |
| href      | string                 | false    |          | The URL to link to when the button is clicked |
| size      | 'small' \| 'medium'    | 'large'  | false    | 'large'                                       | The size of the button |
| variant   | ButtonProps['variant'] | false    | 'filled' | The variant of the button                     |

```jsx
import { CallToActionButton } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
;<CallToActionButton
  href="https://discord.gg/server"
  size="large"
  variant="filled"
>
  Join our community
</CallToActionButton>
```

### CallToActionSection

A call-to-action section component that can be used in MDX pages.

**Props**

| Prop Name   | Type                                | Required | Default    | Description                                               |
| ----------- | ----------------------------------- | -------- | ---------- | --------------------------------------------------------- |
| title       | ReactReactNode                      | false    |            | The title of the section                                  |
| description | ReactReactNode                      | false    |            | The description of the section                            |
| columns     | 1 \| 2                              | false    | 1          | The number of columns to display the content in           |
| href        | string                              | false    |            | The URL to link to when the button is clicked             |
| label       | string                              | false    |            | The label to display on the button                        |
| target      | ReactAnchorHTMLAttributes['target'] | false    |            | The target attribute for the link e.g., `_self`, `_blank` |
| variant     | ButtonProps['variant']              | false    | 'outlined' | The variant of the button                                 |
| list        | Array                               | false    | []         | A list of items to display in the section                 |

```tsx
import { CallToActionSection } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
;<CallToActionSection
  title="Logos Network State"
  columns={1}
  description="Waku is powering the communication layer of the Logos Network State. Logos is a grassroots movement to provide trust-minimised, corruption-resistant governing services and social institutions to peaceful people worldwide. Learn more about our ambitious vision."
  label="Explore Logos"
  href="https://logos.co/"
  target="_blank"
/>
```

With a list:

```tsx
import { CallToActionSection } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
;<CallToActionSection
  title="Run Nimbus in one of three setups"
  description={
    <>
      Follow the detailed
      <br />
      step-by-step guide here
    </>
  }
  list={[
    {
      title: 'Simple setup',
      description:
        'Run integrated Nimbus Beacon Node and Validator Client together.',
    },
    {
      title: 'Use Nimbus Beacon node',
      description:
        'Run Nimbus Beacon Node with an alternative validator client.',
    },
    {
      title: 'Use Nimbus Validator client',
      description:
        'Run Nimbus Validator Client with an alternative Beacon Node',
    },
  ]}
  label="Get Nimbus"
  target="_blank"
  href="https://nimbus.guide/quick-start.html"
/>
```

### ExternalResourceCard

A card component with an optional image preview for displaying information about an external resource.

**Props**

| Prop Name      | Type           | Required | Default | Description                                        |
| -------------- | -------------- | -------- | ------- | -------------------------------------------------- |
| logoSrc        | string         | false    |         | The source URL for logo image in light mode        |
| logoSrcDark    | string         | false    |         | The source URL for logo image in dark mode         |
| title          | ReactReactNode | false    |         | The title of the external resource                 |
| description    | ReactReactNode | false    |         | The description of the external resource           |
| previewSrc     | string         | false    |         | The source URL for the preview image in light mode |
| previewSrcDark | string         | false    |         | The source URL for the preview image in dark mode  |

**Example usage:**

```jsx
import { ExternalResourceCard } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'

<ExternalResourceCard
  title="Figma"
  href="https://www.figma.com/
  description="Design and prototype in one place with Figma."
  logoSrc="/img/figma-logo.svg"
  logoSrcDark="/img/figma-logo-dark.svg"
  previewSrc="/img/figma-preview.png"
  previewSrcDark="/img/figma-preview-dark.png"
/>
```

### FeatureList

A component that displays a list of features with titles and descriptions.

**Props**

| Prop Name | Type              | Required | Default    | Description                                       |
| --------- | ----------------- | -------- | ---------- | ------------------------------------------------- |
| title     | ReactReactNode    | false    | 'Features' | The title of the feature list.                    |
| features  | Array             | false    | []         | An array of features to be displayed in the list. |
| alignment | 'bottom' \| 'top' | false    | 'bottom'   | The vertical alignment of feature description.    |

```tsx
import { FeatureList } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
;<FeatureList
  title="Features"
  alignment="top"
  features={[
    { title: 'Feature 1', description: 'Description of feature 1' },
    { title: 'Feature 2', description: 'Description of feature 2' },
    { title: 'Feature 3', description: 'Description of feature 3' },
  ]}
>
  <CallToActionButton variant="outlined" href="/about/" target="_self">
    Read More
  </CallToActionButton>
</FeatureList>
```

### Hero

A hero component that displays a large banner at the top of a page.

**Props**

| Prop Name | Type                | Required | Default | Description |
| --------- | ------------------- | -------- | ------- | ----------- | --- |
| size      | 'large' \| 'medium' | 'small'  | false   | 'medium'    |     |

```tsx
import {
  Hero,
  HeroTitle,
  HeroDescription,
  HeroVideo,
  HeroActions,
  HeroAction,
} from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
;<Hero size="large">
  <HeroInfo>
    <HeroTitle>
      {'Light and Performant Clients, for All Ethereum Validators'}
    </HeroTitle>
    <HeroDescription>
      {
        'Ethereum validators of all sizes trust Nimbus to run their nodes. From large node operators, to solo stakers on a Raspberry Pi.'
      }
    </HeroDescription>
    <HeroActions>
      <HeroAction
        variant="outlined"
        href="https://nimbus.guide/quick-start.html"
        target="_blank"
      >
        Get Nimbus
      </HeroAction>
    </HeroActions>
  </HeroInfo>

  <HeroVideo
    placeholderSrc="/hero/halo01-1080x1080-placeholder.png"
    desktop={{ scale: '1.514792899' }}
    mobile={{ scale: '1.514792899' }}
  >
    <source
      src="/hero/halo01-2048x2048-24fps-1M.mov"
      type='video/mp4; codecs="hvc1"'
    />
    <source src="/hero/halo01-2048x2048-24fps-1M.webm" type="video/webm" />
  </HeroVideo>
</Hero>
```

### JobsPerDepartment

A component for displaying job openings organized by department. The component requires a `jobData` prop that contains an array of departments, each with an array of jobs openings. If you're using our preset, this data is automatically fetched from Greenhouse API. To enable this, please refer to the [preset documentation](../logos-docusaurus-preset#xyz).

**Props**

| Prop Name    | Type      | Required | Default | Description                                                  |
| ------------ | --------- | -------- | ------- | ------------------------------------------------------------ |
| jobData      | signature | true     |         | An array of departments, each with an array of job openings. |
| titleFilter  | string    | false    | ''      | A string to filter jobs by title.                            |
| useDummyData | boolean   | false    | false   | Use dummy data instead of real data.                         |

**Example usage:**

```jsx
import * as jobData from '/static/generated/jobs.json'
import { JobsPerDepartment } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
;<JobsPerDepartment jobData={jobData} />
```

### PageCard

A card component used in Docusaurus auto-generated category index pages to display page links.

**Props**

| Prop Name   | Type           | Required | Default                        | Description |
| ----------- | -------------- | -------- | ------------------------------ | ----------- |
| title       | ReactReactNode | false    |                                |             |
| description | ReactReactNode | false    |                                |             |
| icon        | ReactReactNode | false    | <FolderIcon color="primary" /> |             |
| target      | undefined      | false    | '\_self'                       | undefined   |

```tsx
import { PageCard } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
;<PageCard
  title="Sample Page"
  description="This is a sample page description."
  href="/sample-page"
/>
```

### ProfileCard

A component used to display team members' profiles, including their name, avatar, and social links.

**Props**

| Prop Name       | Type   | Required | Default | Description |
| --------------- | ------ | -------- | ------- | ----------- |
| imgSrc          | string | false    |         |             |
| name            | string | false    |         |             |
| githubUsername  | string | false    |         |             |
| githubLink      | string | false    |         |             |
| discordUsername | string | false    |         |             |
| discordLink     | string | false    |         |             |

```tsx
import { ProfileCard } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
;<ProfileCard
  imgSrc="/path/to/profile-image.jpg"
  name="John Doe"
  githubUsername="johndoe"
  githubLink="https://github.com/johndoe"
  discordUsername="johndoe#1234"
  discordLink="https://discordapp.com/users/johndoe"
/>
```

Example usage of ProfileCard within a grid:

```tsx
import {
  Grid,
  ProfileCard,
} from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
;<Grid
  xs={{ cols: 3, gap: '1rem', wrap: false }}
  md={{ cols: 4, gap: '1rem', wrap: true }}
>
  <Grid.Item>
    <ProfileCard
      name="Name"
      githubUsername="Github"
      githubLink="https://github.com/"
      discordUsername="Discord"
      discordLink="https://discord.gg/"
    />
  </Grid.Item>
  Add more ProfileCard items within the grid
</Grid>
```

### SocialCard

A component used for displaying social media or community platform cards with a logo and description.

**Props**

| Prop Name   | Type           | Required | Default | Description                                                                         |
| ----------- | -------------- | -------- | ------- | ----------------------------------------------------------------------------------- |
| logoSrc     | string         | false    |         | The URL of the logo image for the social media or community platform (light theme). |
| logoSrcDark | string         | false    |         | The URL of the logo image for the social media or community platform (dark theme).  |
| description | ReactReactNode | false    |         | The description or content associated with the social media or community platform.  |

```tsx
import { SocialCard } from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
;<SocialCard
  title="Telegram Community"
  logoSrc="/path/to/telegram-logo.png"
  description="Join our Telegram community to stay updated and chat with fellow members."
  href="https://t.me/your-telegram-community"
/>
```

Grid example:

```tsx
import {
  Box,
  Grid,
  SocialCard,
} from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
;<Box top={56} bottom={56}>
  <Grid xs={{ cols: 1, gap: '1rem' }} md={{ cols: 2 }}>
    <Grid.Item xs={1}>
      <SocialCard
        href="https://twitter.com/twitter-handle"
        logoSrcDark="/icons/x.svg"
        description="Follow us on X"
      />
    </Grid.Item>
    <Grid.Item xs={1}>
      <SocialCard
        href="https://discord.gg/discord-server"
        logoSrcDark="/icons/discord-white.svg"
        description="Join the community on Discord"
      />
    </Grid.Item>
  </Grid>
</Box>
```

### TimelineItem

A component for displaying roadmap items, such as events or milestones, in a timeline layout.

**Props**

| Prop Name   | Type                | Required | Default | Description                                                                              |
| ----------- | ------------------- | -------- | ------- | ---------------------------------------------------------------------------------------- | -------------------------------------- |
| index       | ReactReactNode      | true     |         | The index or label of the timeline item.                                                 |
| alignment   | 'top' \| 'bottom'   | false    | 'top'   | The alignment of the timeline item, either 'top' or 'bottom'. (Optional, default: 'top') |
| period      | ReactReactNode      | true     |         | The period or time frame associated with the timeline item. e.g., `2023 Q3`              |
| description | ReactReactNode      | true     |         | The description or content of the timeline item.                                         |
| borderStyle | 'solid' \| 'dashed' | 'none'   | false   |                                                                                          | The border style for the timeline item |

Roadmap example:

```tsx
import {
  Box,
  Grid,
  TimelineItem,
  SectionHeader,
  CallToActionButton,
} from '@acid-info/logos-docusaurus-theme/lib/client/components/mdx'
;<Box top={{ xs: 144, lg: 216 }}>
  <SectionHeader
    title="Roadmap"
    description="Roadmap description"
    bottom={{ xs: '4rem', lg: '7.25rem' }}
  />
  <Grid
    xs={{ cols: 6, wrap: false, gap: '0 1rem' }}
    actions={
      <CallToActionButton
        style={{ marginTop: 0 }}
        size="small"
        variant="outlined"
        href="/about"
      >
        Read more
      </CallToActionButton>
    }
  >
    <Grid.Item>
      <TimelineItem
        index={0}
        period="2013"
        borderStyle="solid"
        description="First item"
      />
    </Grid.Item>
    Add more items here
    <Grid.Item>
      <TimelineItem
        index={10}
        period="2024+"
        borderStyle="none"
        description="Last item"
      />
    </Grid.Item>
  </Grid>
</Box>
```
