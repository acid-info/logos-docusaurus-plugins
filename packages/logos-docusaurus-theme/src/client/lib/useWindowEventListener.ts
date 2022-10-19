import { useEventListener } from './useEventListener'

export const useWindowEventListener = <K extends keyof WindowEventMap, T = any>(
  key: K | string,
  listener: (
    ev: Record<K, any> extends Record<K, WindowEventMap[K]>
      ? WindowEventMap[K]
      : T,
  ) => void,
  options?: boolean | AddEventListenerOptions,
  deps: any[] = [],
) => {
  useEventListener(
    key,
    () => typeof window !== 'undefined' && (window as any),
    listener,
    options,
    deps,
  )
}
