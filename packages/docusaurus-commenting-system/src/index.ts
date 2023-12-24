import type { LoadContext, Plugin } from '@docusaurus/types'
import path from 'path'

export type PluginOptions = {
  supabaseUrl: string
  supabaseAnonKey: string
}

export default function docusaurusCommentingSystemPlugin(
  context: LoadContext,
  options: PluginOptions,
): Plugin<any> {
  const { supabaseUrl, supabaseAnonKey } = options

  return {
    name: 'docusaurus-commenting-system',
    getClientModules: () => [path.resolve(__dirname, './client')],
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `
              window.SUPABASE_URL = "${supabaseUrl}";
              window.SUPABASE_ANON_KEY = "${supabaseAnonKey}";
            `,
          },
        ],
      }
    },
  }
}
