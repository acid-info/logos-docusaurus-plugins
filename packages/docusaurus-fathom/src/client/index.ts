import { SITE_ID, SCRIPT_URL } from './options'

declare global {
  interface Window {
    fathom: any
  }
}

;(function (f: any, a: Window, t: string, h: string) {
  a[h] =
    a[h] ||
    function () {
      ;(a[h].q = a[h].q || []).push(arguments)
    }
  const o = f.createElement('script')
  const m = f.getElementsByTagName('script')[0]
  o.async = 1
  o.src = t
  o.id = 'fathom-script'
  m.parentNode.insertBefore(o, m)
})(document, window, SCRIPT_URL, 'fathom')

const { fathom } = window as any
fathom('set', 'siteId', SITE_ID)
fathom('trackPageview')

console.log('PLUGIN_SITE_ID', SITE_ID)

export function onRouteDidUpdate({ location, previousLocation }) {
  if (location.pathname !== previousLocation?.pathname) {
    fathom('trackPageview')
  }
}
