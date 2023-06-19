import * as fs from 'fs'
import * as fsp from 'fs/promises'
import hashObj from 'object-hash'
import path from 'path'
import React from 'react'

// @ts-expect-error
import type Satori from 'satori'
// @ts-expect-error
import { type SatoriOptions } from 'satori'
import type Sharp from 'sharp'

export type ImageGeneratorOptions = SatoriOptions
export type ImageGeneratorResult = {
  url: string
  relativePath: string
  absolutePath: string
}

export class ImageGenerator {
  private satori: typeof Satori
  private sharp: typeof Sharp
  private cache: Record<string, ImageGeneratorResult> = {}

  private outDir: string = ''

  constructor(
    private args: {
      dir: string
      websiteUrl: string
      websiteOutDir: string
    },
  ) {
    this.outDir = path.join(this.args.websiteOutDir, this.args.dir)
  }

  public init = async () => {
    this.satori = await import('satori').then((mod) => mod.default)
    this.sharp = await import('sharp').then((mod) => mod.default)

    if (!fs.existsSync(this.outDir))
      await fsp.mkdir(this.outDir, { recursive: true })
  }

  public generate = async (
    element: React.ReactNode,
    options: ImageGeneratorOptions,
  ): Promise<ImageGeneratorResult> => {
    const hash = hashObj([element, options])
    if (this.cache[hash]) return this.cache[hash]!

    const imageName = `${hash}.png`
    const absolutePath = path.join(this.outDir, imageName)
    const relativePath = path.join(
      '/',
      this.args.dir,
      absolutePath.slice(this.outDir.length),
    )

    const svg = await this.satori(element, options)
    await this.sharp(Buffer.from(svg)).png().toFile(absolutePath)

    const url = new URL(this.args.websiteUrl)
    url.pathname = relativePath

    this.cache[hash] = {
      relativePath,
      absolutePath,
      url: url.toString(),
    }

    return this.cache[hash]!
  }
}
