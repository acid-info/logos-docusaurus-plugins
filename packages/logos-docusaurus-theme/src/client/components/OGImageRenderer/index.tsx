import {
  ImageGeneratorOptions,
  imageRendererFactory,
} from '@acid-info/docusaurus-og'
import { DocusaurusConfig } from '@docusaurus/types'
import { readFileSync } from 'fs'
import path from 'path'
import React from 'react'
import sharp from 'sharp'

const options: ImageGeneratorOptions = {
  width: 1200,
  height: 630,

  fonts: [
    {
      name: 'Roboto',
      data: readFileSync(
        path.resolve(__dirname, '../../static/fonts/roboto/Roboto-Regular.ttf'),
      ),
      weight: 400,
      style: 'normal',
    },
  ],
}

const Layout: React.FC<{
  logo?: React.ReactNode
  title: React.ReactNode
  footer: React.ReactNode | Array<React.ReactNode | undefined | false>
}> = ({ title, footer, logo }) => {
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
      <div style={{ display: 'flex', height: '120px', overflow: 'hidden' }}>
        {logo}
      </div>
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
    if (doc.metadata.frontMatter.image) return

    const logo = await getLogo(siteConfig, outDir)

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
        logo={<img src={logo.src} style={{ height: 120 }} />}
      />,
      options,
    ]
  },
)

const blogImageRenderer = imageRendererFactory(
  'docusaurus-plugin-content-blog',
  async (page, { outDir, siteConfig }) => {
    if (page.pageType === 'post' && !!page.data.metadata.frontMatter.image)
      return

    const { pageType, data } = page

    const logo = await getLogo(siteConfig, outDir)

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
        logo={<img src={logo.src} style={{ height: 120 }} />}
      />,
      options,
    ]
  },
)

const pagesImageRenderer = imageRendererFactory(
  'docusaurus-plugin-content-pages',
  async (page, { outDir, siteConfig }) => {
    const { metadata, plugin } = page
    const url = new URL(siteConfig.url)

    const logo = await getLogo(siteConfig, outDir)

    return [
      <Layout
        title={metadata.title}
        footer={url.host}
        logo={<img src={logo.src} style={{ height: 120 }} />}
      />,
      options,
    ]
  },
)

const getLogo = (() => {
  const cache: Record<string, any> = {}

  return async (
    siteConfig: DocusaurusConfig,
    outDir: string,
  ): Promise<{ src: any }> => {
    const logo: any = (siteConfig.themeConfig as any).navbar.logo

    if (cache[logo.src]) return cache[logo.src]

    const isUrl = logo.src.startsWith('http')

    if (isUrl) return { src: logo.src }

    const logoPath = path.join(outDir, logo.src)

    const img = sharp(logoPath)
    const buffer = await img.resize({ height: 120 }).toBuffer()

    cache[logo.src] = { src: buffer.buffer }
    return cache[logo.src]
  }
})()

export default {
  blog: blogImageRenderer,
  docs: docsImageRenderer,
  pages: pagesImageRenderer,
}
