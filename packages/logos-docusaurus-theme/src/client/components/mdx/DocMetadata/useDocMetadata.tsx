import { useDoc } from '@docusaurus/plugin-content-docs/lib/client/doc.js'
import { useDocThemeOptions } from '../../../lib/useThemeOptions'
import format from 'date-fns/format'

export const useDocMetadata = () => {
  const options = useDocThemeOptions()
  const { content: { authors = [] } = {} } = options

  const { frontMatter = {} } = useDoc() as any
  const { author = [], date } = frontMatter

  const docAuthors = (Array.isArray(author) ? author : [author])
    .map((key) => authors.find((a) => key === a.key))
    .filter((a) => !!a)

  return {
    date: date ? format(new Date(date), 'MMM d yyyy') : '',
    authors: docAuthors,
  }
}
