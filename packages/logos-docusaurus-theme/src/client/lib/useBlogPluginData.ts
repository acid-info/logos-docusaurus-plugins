import { PluginOptions } from '@docusaurus/plugin-content-blog'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export const useBlogPluginData = () => {
  const ctx = useDocusaurusContext()

  const plugins = ctx.siteConfig.plugins.filter(
    (plugin) =>
      Array.isArray(plugin) &&
      [
        'docusaurus-plugin-content-blog',
        '@docusaurus/plugin-content-blog',
      ].includes(plugin[0] as string),
  )

  if (plugins.length === 0)
    return {
      routeBasePath: '/blog',
    } as Partial<PluginOptions>

  const plugin = plugins.find((plugin) =>
    window.location.pathname.startsWith(
      (plugin as [string, PluginOptions])[1].routeBasePath,
    ),
  )

  if (!plugin)
    return {
      routeBasePath: '/blog',
    } as Partial<PluginOptions>

  return (plugin as any)[1] as Partial<PluginOptions>
}
