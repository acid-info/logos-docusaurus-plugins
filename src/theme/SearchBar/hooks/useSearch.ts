import { useEffect, useRef, useState } from 'react'
import { useVersionUrl } from './useVersionUrl'

export const useSearch = () => {
  const win = window as any

  const versionUrl = useVersionUrl()

  const [loaded, setLoaded] = useState(false)
  const search = useRef(null)

  const init = async () => {
    search.current = await win.createSearchInstance({
      resultsLimit: 50,
      preferredVersionPath: versionUrl,
    })

    await search.current.init()

    setLoaded(true)
  }

  useEffect(() => {
    setLoaded(false)

    init()
  }, [versionUrl])

  return {
    loaded,
    query: async (input: string) => await search.current.query(input),
  }
}
