import path from 'path'

export default function docusaurusCommentingSystemPlugin(context, options) {
  return {
    name: 'docusaurus-commenting-system',
    clientModules() {
      return [path.resolve(__dirname, './client')]
    },
  }
}
