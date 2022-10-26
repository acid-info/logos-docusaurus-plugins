import { useEffect, useRef, useState } from 'react'
import { useProxiedGeneratedData } from './useProxiedGeneratedData'
import { useVersionUrl } from './useVersionUrl'

export const useSearch = () => {
  const win = window as any

  const data = useProxiedGeneratedData()
  const versionUrl = useVersionUrl()

  const [loaded, setLoaded] = useState(false)
  const search = useRef<any>(null)

  const init = async () => {
    search.current = await win.createSearchInstance({
      resultsLimit: 50,
      preferredVersionPath: versionUrl,
      searchContextByPaths: data.searchContextByPaths,
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
