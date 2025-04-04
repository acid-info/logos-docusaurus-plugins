module.exports = function (context, options) {
  if (!options.websiteId) {
    throw new Error('You need to specify a websiteId for the Umami plugin')
  }

  if (!options.scriptSrc) {
    throw new Error('You need to specify a scriptSrc for the Umami plugin')
  }

  const { websiteId, scriptSrc } = options

  return {
    name: 'docusaurus-plugin-umami',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              defer: true,
              src: scriptSrc,
              'data-website-id': websiteId,
            },
          },
        ],
      }
    },
  }
}
