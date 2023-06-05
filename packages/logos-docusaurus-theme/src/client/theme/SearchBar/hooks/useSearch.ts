import { useEffect, useRef, useState } from 'react'
import { useSearchContextPath } from './useSearchContextPath'

export const useSearch = () => {
  const { createSearchInstance } = window as any

  const searchContextPath = useSearchContextPath()

  const [loaded, setLoaded] = useState(false)
  const search = useRef<any>(null)

  const init = async () => {
    search.current = await createSearchInstance({
      resultsLimit: 50,
      preferredVersionPath: searchContextPath[0],
      searchContextByPaths: searchContextPath[1],
    })

    await search.current.init()

    setLoaded(true)
  }

  useEffect(() => {
    setLoaded(false)

    init()
  }, [searchContextPath[0], searchContextPath[1]])

  return {
    loaded,
    query: async (input: string) => await search.current.query(input),
  }
}
