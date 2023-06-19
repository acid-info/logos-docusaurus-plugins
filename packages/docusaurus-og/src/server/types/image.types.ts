import { Props } from '@docusaurus/types'

// @ts-expect-error
import type { SatoriOptions } from 'satori'

export type ImageGeneratorOptions = SatoriOptions
export type ImageGeneratorResult = {
  path: string
  absolutePath: string
}

export type ImageRenderer<T = any> = (
  data: T,
  context: Props,
) =>
  | [React.ReactNode, ImageGeneratorOptions]
  | undefined
  | void
  | false
  | Promise<[React.ReactNode, ImageGeneratorOptions] | undefined | void | false>

export type ImageGenerator<T = any> = (data: T) => string
