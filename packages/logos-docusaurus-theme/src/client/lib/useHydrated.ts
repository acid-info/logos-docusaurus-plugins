import { useEffect, useState } from 'react'

export const useHydrated = () => {
  const [value, setValue] = useState(false)

  useEffect(() => {
    setValue(true)
  }, [])

  return value
}
