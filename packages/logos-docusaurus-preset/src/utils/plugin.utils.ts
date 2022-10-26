import type { PluginConfig } from '@docusaurus/types'

export const findPlugin = (
  plugins: PluginConfig[],
  filter: (path: string, config: any) => boolean,
): PluginConfig[] =>
  plugins.filter((plugin) => {
    if (!plugin || typeof plugin === 'function') return

    const [path, config] = Array.isArray(plugin) ? plugin : [plugin, undefined]
    return filter(path as string, config)
  })

export const findPluginByName = (plugins: PluginConfig[], name: string) =>
  findPlugin(plugins, (path) => path.includes(name))
