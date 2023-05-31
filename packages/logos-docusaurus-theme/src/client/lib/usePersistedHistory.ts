import { useLocalStorage } from 'react-use'

export const usePersistedHistory = <T = any>(
  key: string,
  options?: {
    equals?: (a: T, b: T) => boolean
    unique?: boolean
  },
) => {
  const unique = options?.unique ?? false
  const equals = options?.equals ?? ((a, b) => a === b)

  const [history, setHistory] = useLocalStorage<T[]>(
    'logos-docusaurus-theme-' + key,
    [],
  )

  const add = (value: T) => {
    const arr = history ?? []
    setHistory([
      value,
      ...(unique ? arr.filter((item) => !equals(item, value)) : arr),
    ])
  }

  const remove = (rm: (item: T, index: number) => boolean) => {
    const arr = history ?? []
    setHistory(arr.filter((item, index) => !rm(item, index)))
  }

  const removeByIndex = (index: number) => {
    remove((item, idx) => idx === index)
  }

  const clear = () => {
    setHistory([])
  }

  return {
    add,
    clear,
    remove,
    removeByIndex,
    list: history,
  }
}
