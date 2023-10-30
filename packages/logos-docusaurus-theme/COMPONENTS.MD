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
