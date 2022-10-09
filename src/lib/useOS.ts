export const useOS = (): 'windows' | 'linux' | 'mac' | 'unknown' => {
  const str =
    navigator?.appVersion ?? navigator?.platform ?? navigator?.userAgent

  return /mac/gi.test(str)
    ? 'mac'
    : /win/gi.test(str)
    ? 'windows'
    : /linux/gi.test(str)
    ? 'linux'
    : 'unknown'
}
