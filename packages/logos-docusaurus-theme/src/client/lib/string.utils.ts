export const ensureTrailingString = (str: string, trail: string) =>
  str.endsWith(trail) ? str : str + trail

export const ensureTrailingSlash = (str: string) =>
  ensureTrailingString(str, '/')
