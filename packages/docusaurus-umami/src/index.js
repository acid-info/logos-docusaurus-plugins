module.exports = function (context, options) {
  if (!options.websiteId) {
    throw new Error('You need to specify a websiteId for the Umami plugin')
  }

  if (!options.scriptSrc) {
    throw new Error('You need to specify a scriptSrc for the Umami plugin')
  }

  const { websiteId, scriptSrc, dataDomains } = options
  if (typeof dataDomains !== 'undefined' && typeof dataDomains !== 'string') {
    throw new Error(
      'dataDomains must be a comma-separated string when provided',
    )
  }

  return {
    name: 'docusaurus-plugin-umami',
    injectHtmlTags() {
      const loader = `;(function(){
        function onError(){
          if(!window.umami){
            console.warn('[docusaurus-plugin-umami] Failed to load Umami script - using mock tracker instead.');
            window.umami = {
              track: function(){},
              identify: function(){}
            }
          }
        }
        var s = document.createElement('script');
        s.defer = true;
        s.src = ${JSON.stringify(scriptSrc)};
        s.setAttribute('data-website-id', ${JSON.stringify(websiteId)});
        if(${JSON.stringify(
          !!dataDomains,
        )}) s.setAttribute('data-domains', ${JSON.stringify(dataDomains)});
        s.onerror = onError;
        (document.head || document.getElementsByTagName('head')[0]).appendChild(s);
      })();`
      return { headTags: [{ tagName: 'script', innerHTML: loader }] }
    },
  }
}
