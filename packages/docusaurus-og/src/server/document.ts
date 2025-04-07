import * as fsp from 'fs/promises'
import { HTMLElement, parse as parseHTML } from 'node-html-parser'

const IMAGE_META_ELEMENTS: Array<[string, string]> = [
  ['name', 'image'],
  ['property', 'og:image'],
  ['name', 'twitter:image'],
]

export class Document {
  root: HTMLElement
  loaded = false

  constructor(private path: string) {}

  load = async () => {
    const htmlString = await fsp.readFile(this.path, 'utf-8')
    this.root = parseHTML(htmlString)
    this.loaded = true
  }

  write = async () => {
    await fsp.writeFile(this.path, Buffer.from(this.root.outerHTML))
  }

  setImage = async (url: string) => {
    IMAGE_META_ELEMENTS.forEach(([attr, value]) =>
      this.updateMeta(attr, value, {
        content: url,
      }),
    )
  }

  get head() {
    return this.root.querySelector('head')!
  }

  private getMeta(attr: string, value: string) {
    const { head } = this

    let meta = head.querySelector(`meta[${attr}=${value}]`)

    if (!meta) {
      meta = new HTMLElement('meta', {}, '', undefined, [0, 0])
      meta.setAttribute(attr, value)
      head.appendChild(meta)
    }

    return meta
  }

  private updateMeta = (
    attr: string,
    value: string,
    attrs: Record<string, any>,
  ) => {
    const el = this.getMeta(attr, value)
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value))

    return el
  }
}
