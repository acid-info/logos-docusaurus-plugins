import { ImageRenderer } from './image.types'

export type PluginOptions = {
  path: string
  imageRenderers: Record<string, ImageRenderer>
}
