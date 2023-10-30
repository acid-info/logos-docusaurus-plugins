import fsp from 'fs/promises'
import { glob } from 'glob'
import path from 'path'

const main = async () => {
  const reactDocGen = await import('react-docgen')

  const files = await glob(
    path.resolve(__dirname, '../src/client/components/mdx/**/*.tsx'),
  ).then((filenames) =>
    filenames.sort((a, b) => path.basename(a).localeCompare(path.basename(b))),
  )

  let markdown = ''

  for (const file of files) {
    try {
      const raw = await fsp.readFile(file, 'utf-8')
      const docs = reactDocGen.parse(raw, {
        filename: path.basename(file),
      })

      for (const doc of docs) {
        if (!doc.description) continue

        markdown += `### ${doc.displayName}\n\n`
        const lines = (doc.description || '').split('\n')
        const exampleIndex = lines.findIndex(
          (line) => line.match(/^@example.*/)?.[0],
        )

        const description = (
          exampleIndex > -1 ? lines.slice(0, exampleIndex) : lines
        ).join('\n')

        markdown += `${description}\n`

        if (doc.props) {
          markdown += '**Props**\n\n'
          markdown +=
            '| Prop Name | Type | Required | Default | Description |\n'
          markdown += '| --- | --- | --- | --- | --- |\n'

          for (const propName in doc.props) {
            const prop = doc.props[propName]
            if (!prop) continue

            markdown += `| ${propName} | ${
              prop.tsType?.name === 'union'
                ? (prop.tsType.raw || '').replace('|', '\\|')
                : prop.tsType?.name
            } | ${prop.required} | ${
              prop.defaultValue ? prop.defaultValue.value : ''
            } | ${prop.description} |\n`
          }

          markdown += '\n\n'
        }

        if (exampleIndex > -1) {
          markdown += '\n'
          markdown += lines.slice(exampleIndex + 1).join('\n')
        }

        markdown += '\n\n'
      }
    } catch (error) {
      console.log('failed to parse ' + file)
    }
  }

  await fsp.writeFile(path.join(__dirname, '../COMPONENTS.MD'), markdown)
}

main()
