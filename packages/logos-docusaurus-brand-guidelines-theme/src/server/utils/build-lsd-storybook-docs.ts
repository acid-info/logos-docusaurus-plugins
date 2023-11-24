import * as fs from 'fs'
import * as fsp from 'fs/promises'
import fetch from 'node-fetch'
import * as path from 'path'
import { URL } from 'url'
import { ComponentGridProps } from '../../client/components/mdx'

export type BuildLSDStorybookDocsOptions = {
  storybookUrl: string
  componentsDirectory: string
  designTokensDirectory: string
  staticDirectory: string
  excludeComponents?: string[]
  componentConfig?: {
    [key: string]: {
      globalProps?: string[]
    }
  }
}

export const buildLSDStorybookDocs = async ({
  storybookUrl,
  componentsDirectory,
  designTokensDirectory,
  excludeComponents = [],
  componentConfig = {},
  staticDirectory,
}: BuildLSDStorybookDocsOptions) => {
  const metadataUrl = new URL('/_metadata.json', storybookUrl)
  const metadata = await (await fetch(metadataUrl.toString())).json()

  if (fs.existsSync(componentsDirectory))
    await fsp.rm(componentsDirectory, { recursive: true })

  if (fs.existsSync(designTokensDirectory))
    await fsp.rm(designTokensDirectory, { recursive: true })

  await fsp.mkdir(componentsDirectory, { recursive: true })
  await fsp.mkdir(designTokensDirectory, { recursive: true })

  const components = metadata.components.filter(
    (component) => !excludeComponents.includes(component.name),
  )

  for (const component of components) {
    const story =
      component.stories.find((s) => s.name === 'Root') || component.stories[0]
    const storyId = story.id

    let doc = ''
    doc += `---\ntitle: ${component.name}\n---\n\n`
    doc += `import { StorybookDemo } from '@site/src/components/mdx';\n\n`
    doc += `# ${component.component.title}\n\n`
    doc += `<StorybookDemo name="${
      component.name
    }" storybookUrl="${storybookUrl}" docId="${storyId.replace(
      '--root',
      '--docs',
    )}" globalTypes={{}} componentProperties={[]} />\n`

    await fsp.writeFile(
      path.join(componentsDirectory, `${component.name}.mdx`),
      doc,
    )
  }

  {
    const themeProvider = components.find(
      (comp) => comp.name === 'ThemeProvider',
    )

    const root = themeProvider.stories.find((story) => story.name === 'Root')
    const stories = themeProvider.stories.filter((story) => story !== root)
    for (const story of stories) {
      let doc = ''
      const config = componentConfig[story.name] || {}
      const globalControls = config.globalProps || ['themeConfig', 'themeFont']

      doc += `---\ntitle: ${story.name}\n---\n\n`
      doc += `import { StorybookDemo } from '@site/src/components/mdx';\n\n`
      doc += `# ${story.name}\n\n`
      doc += `<StorybookDemo name="${story.name}" docId="${root.id.replace(
        '--root',
        '--docs',
      )}" storybookUrl="${storybookUrl}" storyId="${
        story.id
      }" globalTypes={{}} componentProperties={[]} globalControls={${JSON.stringify(
        globalControls,
      )}}/>\n`

      await fsp.writeFile(
        path.join(designTokensDirectory, `${story.name}.mdx`),
        doc,
      )
    }

    await fsp.writeFile(
      path.join(designTokensDirectory, '_category_.json'),
      JSON.stringify(
        {
          label: 'Design Tokens',
          link: {
            type: 'generated-index',
            title: 'Design Tokens',
          },
        },
        null,
        2,
      ),
    )
  }

  {
    // components index page

    let doc = ''
    doc += `---\ntitle: Components\n---\n\n`
    doc += `import { ComponentGrid } from '@site/src/components/mdx';\n\n`
    doc += `# Components\n\n`

    const list: ComponentGridProps['list'] = []

    for (const component of components) {
      const { name } = component

      const fullPath = path.join(staticDirectory, `/${name}.png`)
      const imagePath = '/' + fullPath.split('/static/')[1]

      if (fs.existsSync(fullPath)) {
        list.push({
          title: name,
          href: `./${name}`,
          imageSrc: imagePath,
        })
      }
    }

    doc += `<ComponentGrid list={${JSON.stringify(list, null, 2)}} />\n`

    await fsp.writeFile(path.join(componentsDirectory, `index.mdx`), doc)
  }
}
