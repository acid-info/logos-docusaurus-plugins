import {
  BlogPaginated,
  BlogPost,
  BlogTag,
  PluginOptions,
} from '@docusaurus/plugin-content-blog'

export type BlogPageType =
  | 'post'
  | 'list'
  | 'archive'
  | 'tags'
  | 'tag'
  | 'archive'

export type BlogPageData = {
  plugin: PluginOptions
  permalink: string
} & (
  | {
      pageType: Extract<BlogPageType, 'post'>
      data: BlogPost
    }
  | {
      pageType: Extract<BlogPageType, 'list'>
      data: BlogPaginated
    }
  | {
      pageType: Extract<BlogPageType, 'tags'>
      data: {
        permalink: string
      }
    }
  | {
      pageType: Extract<BlogPageType, 'tag'>
      data: BlogTag['pages'][number]['metadata'] & Pick<BlogTag, 'label'>
    }
  | {
      pageType: Extract<BlogPageType, 'archive'>
      data: {
        permalink: string
      }
    }
)
