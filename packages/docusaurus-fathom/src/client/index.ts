import {
  SITE_ID,
  SCRIPT_URL,
  HOSTNAMES,
} from '@generated/docusaurus-fathom/default/options'
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import { ClientModule } from '@docusaurus/types/src/clientModule'

declare global {
  interface Window {
    fathom: any
  }
}

const main = () => {
  if (
    HOSTNAMES.length > 0
      ? !HOSTNAMES.includes(window.location.hostname)
      : window.location.hostname === 'localhost'
  )
    return
  ;(function (f: any, a: any, t: string, h: string) {
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
}

if (ExecutionEnvironment.canUseDOM) {
  main()
}

export const onRouteDidUpdate: ClientModule['onRouteDidUpdate'] = ({
  location,
  previousLocation,
}) => {
  if (!!window.fathom && location.pathname !== previousLocation?.pathname) {
    window.fathom('trackPageview')
  }
}
