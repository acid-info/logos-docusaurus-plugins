module.exports = function (context, options) {
  if (!options.websiteId) {
    throw new Error('You need to specify a websiteId for the Umami plugin')
  }

  if (!options.scriptSrc) {
    throw new Error('You need to specify a scriptSrc for the Umami plugin')
  }

  const { websiteId, scriptSrc, dataDomains } = options

  return {
    name: 'docusaurus-plugin-umami',
    injectHtmlTags() {
      const attributes = {
        defer: true,
        src: scriptSrc,
        'data-website-id': websiteId,
      }

      if (dataDomains) {
        attributes['data-domains'] = dataDomains
      }

      return {
        headTags: [
          {
            tagName: 'script',
            attributes,
          },
        ],
      }
    },
  }
}
