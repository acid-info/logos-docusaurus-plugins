const path = require('path')

module.exports = function (context, options) {
  const { websiteId, scriptSrc, dataDomains } = options || {}

  if (!websiteId) {
    throw new Error('You need to specify a websiteId for the Umami plugin')
  }

  if (!scriptSrc) {
    throw new Error('You need to specify a scriptSrc for the Umami plugin')
  }

  if (typeof dataDomains !== 'undefined' && typeof dataDomains !== 'string') {
    throw new Error(
      'dataDomains must be a comma-separated string when provided',
    )
  }

  const attributes = {
    defer: true,
    src: scriptSrc,
    'data-website-id': websiteId,
  }
  if (dataDomains) attributes['data-domains'] = dataDomains

  return {
    name: 'docusaurus-plugin-umami',
    getClientModules() {
      return [path.join(__dirname, 'client/umami-mock.js')]
    },
    injectHtmlTags() {
      return {
        headTags: [{ tagName: 'script', attributes }],
      }
    },
  }
}
