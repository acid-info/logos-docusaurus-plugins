import {
  BlogPageData,
  DocsPageData,
  ImageGeneratorOptions,
  imageRendererFactory,
  PageData,
} from '@acid-info/docusaurus-og'
import { BlogPostFrontMatter } from '@docusaurus/plugin-content-blog'
import { DocFrontMatter } from '@docusaurus/plugin-content-docs'
import { MDXPageMetadata } from '@docusaurus/plugin-content-pages'
import { DocusaurusConfig } from '@docusaurus/types'
import axios from 'axios'
import { boolean } from 'boolean'
import { readFileSync } from 'fs'
import * as fsp from 'fs/promises'
import _ from 'lodash'
import hashObject from 'object-hash'
import path from 'path'
import React from 'react'
import sharp, { ResizeOptions } from 'sharp'

const shouldSkip = (
  frontMatter:
    | DocFrontMatter
    | BlogPostFrontMatter
    | MDXPageMetadata['frontMatter']
    | undefined
    | null,
) =>
  frontMatter &&
  typeof frontMatter['og:generate_image'] !== 'undefined' &&
  !boolean(frontMatter['og:generate_image'])

const options: ImageGeneratorOptions = {
  width: 1200,
  height: 630,

  fonts: [
    {
      name: 'Inter',
      data: readFileSync(
        path.resolve(__dirname, '../../static/fonts/Inter/Inter-Regular.ttf'),
      ),
      weight: 400,
      style: 'normal',
    },
  ],
}

const SIDE_IMAGE_WIDTH = options.width / 2
const SIDE_IMAGE_HEIGHT = options.height
const LOGO_HEIGHT = 80

const Layout: React.FC<{
  logo?: React.ReactNode
  image?: React.ReactNode
  title: React.ReactNode
  footer: React.ReactNode | Array<React.ReactNode | undefined | false>
}> = ({ title, footer, logo, image }) => {
  const dot = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px 24px',
      }}
    >
      <span
        style={{
          verticalAlign: 'middle',
          background: 'white',
          width: '6px',
          height: '6px',
          display: 'block',
          borderRadius: '100%',
        }}
      ></span>
    </div>
  )

  const footerItems = Array.isArray(footer)
    ? footer.filter((item) => !!item)
    : [footer]

  if (image) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          color: 'white',
          background: 'black',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div
          style={{
            width: '50%',
            height: '100%',
            color: 'white',
            background: 'black',
            display: 'flex',
            flexDirection: 'column',
            padding: '48px 40px',
            gap: '16px',
            justifyContent: 'space-between',
            flexBasis: '50%',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', overflow: 'hidden' }}>{logo}</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '54px', display: 'flex' }}>{title}</div>
            {footerItems.length > 0 && (
              <div
                style={{
                  marginTop: '24px',
                  fontSize: '32px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '0 24px',
                }}
              >
                <div style={{ display: 'flex' }}>{footerItems[0]}</div>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            width: '50%',
            height: '100%',
            flexBasis: '50%',
            overflow: 'hidden',
          }}
        >
          {image}
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        color: 'white',
        background: 'black',
        display: 'flex',
        flexDirection: 'column',
        padding: '64px 80px',
        gap: '16px',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', overflow: 'hidden' }}>{logo}</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '72px', display: 'flex' }}>{title}</div>
        <div
          style={{
            marginTop: '48px',
            fontSize: '40px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '0 24px',
          }}
        >
          {footerItems.map((item, index) => (
            <React.Fragment key={index}>
              <div style={{ display: 'flex' }}>{item}</div>
              {index < footerItems.length - 1 && dot}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

const docsImageRenderer = imageRendererFactory(
  'docusaurus-plugin-content-docs',
  async (doc, { outDir, siteConfig }) => {
    if (shouldSkip(doc.metadata.frontMatter)) return

    const logo = await getLogo(siteConfig, outDir)
    const image = await getPageImage('docs', outDir, doc)

    return [
      <Layout
        title={doc.metadata.title}
        footer={[
          <span style={{ textTransform: 'capitalize' }}>
            {doc.plugin.id === 'default' ? 'Docs' : doc.plugin.id}
          </span>,
          doc.version.badge && doc.version.label && (
            <span>{doc.version.label}</span>
          ),
        ]}
        logo={
          logo && <img src={logo.src as any} style={{ height: logo.height }} />
        }
        image={
          image && (
            <img
              src={image.src as any}
              width={image.width}
              height={image.height}
            />
          )
        }
      />,
      options,
    ]
  },
)

const blogImageRenderer = imageRendererFactory(
  'docusaurus-plugin-content-blog',
  async (page, { outDir, siteConfig }) => {
    const { pageType, data } = page
    if (pageType === 'post' && shouldSkip(page.data.metadata.frontMatter))
      return

    const logo = await getLogo(siteConfig, outDir)
    const image = await getPageImage('blog', outDir, page)

    return [
      <Layout
        title={
          pageType === 'archive'
            ? 'Archive'
            : pageType === 'tags'
            ? 'Tags'
            : pageType === 'list'
            ? page.data.metadata.blogTitle
            : pageType === 'post'
            ? page.data.metadata.title
            : pageType === 'tag'
            ? page.data.label
            : ''
        }
        footer={[
          page.plugin.blogTitle,
          pageType === 'post' &&
            `by ${page.data.metadata.authors
              .map((author) => author.name)
              .join(', ')}`,
        ]}
        logo={
          logo && <img src={logo.src as any} style={{ height: logo.height }} />
        }
        image={
          image && (
            <img
              src={image.src as any}
              width={image.width}
              height={image.height}
            />
          )
        }
      />,
      options,
    ]
  },
)

const pagesImageRenderer = imageRendererFactory(
  'docusaurus-plugin-content-pages',
  async (page, { outDir, siteConfig }) => {
    const { metadata, plugin } = page
    if (shouldSkip(_.get(metadata, 'frontMatter'))) return

    const url = new URL(siteConfig.url)

    const logo = await getLogo(siteConfig, outDir)
    const image = await getPageImage('page', outDir, page)

    return [
      <Layout
        title={metadata.title}
        footer={url.host}
        logo={
          logo && <img src={logo.src as any} style={{ height: logo.height }} />
        }
        image={
          image && (
            <img
              src={image.src as any}
              width={image.width}
              height={image.height}
            />
          )
        }
      />,
      options,
    ]
  },
)

const getLogo = async (siteConfig: DocusaurusConfig, outDir: string) =>
  await loadImage(outDir, '/theme/image/logo-og.svg', { height: LOGO_HEIGHT })

const getPageImage = async (
  type: 'docs' | 'blog' | 'page',
  outDir: string,
  page: DocsPageData | BlogPageData | PageData,
) => {
  const frontMatter:
    | DocFrontMatter
    | BlogPostFrontMatter
    | MDXPageMetadata['frontMatter']
    | null
    | undefined =
    type === 'docs'
      ? (page as DocsPageData).metadata.frontMatter
      : type === 'blog'
      ? _.get(page, 'data.metadata.frontMatter')
      : _.get(page, 'metadata.frontMatter')

  const image = frontMatter?.image

  if (typeof image === 'string' && image.length > 0)
    return await loadImage(outDir, image, {
      width: SIDE_IMAGE_WIDTH,
      height: SIDE_IMAGE_HEIGHT,
      fit: 'cover',
    })

  return null
}

type LoadedImage = {
  src: string | ArrayBuffer
  width: number | undefined
  height: number | undefined
}

const loadImage = (() => {
  const cache: Record<string, LoadedImage> = {}

  const download = async (url: string) =>
    axios
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then((response) => Buffer.from(response.data, 'binary'))

  return async (outDir: string, url: string, resize?: ResizeOptions) => {
    const cacheKey = hashObject({ url, resize })

    if (cache[cacheKey]) return cache[cacheKey]

    const buffer: Buffer = url.startsWith('data:')
      ? Buffer.from(url, 'base64')
      : url.startsWith('http:')
      ? await download(url)
      : await fsp.readFile(path.join(outDir, url))

    let img = sharp(buffer)
    if (resize) img = img.resize({ ...resize })

    const output = await img.toBuffer()
    const outputImage = sharp(output)
    const outputMetadata = await outputImage.metadata()
    const arrayBuffer = output.buffer

    const loadedImage: LoadedImage = (cache[cacheKey] = {
      src: arrayBuffer,
      width: outputMetadata.width,
      height: outputMetadata.height,
    })

    return loadedImage
  }
})()

export default {
  blog: blogImageRenderer,
  docs: docsImageRenderer,
  pages: pagesImageRenderer,
}
