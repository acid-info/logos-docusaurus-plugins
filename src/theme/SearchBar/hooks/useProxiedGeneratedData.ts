export const useProxiedGeneratedData = () => {
  const win = window as any

  return win.getProxiedGeneratedData()
}
