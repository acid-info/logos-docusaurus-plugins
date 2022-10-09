export const settle = async <R, E = Error>(
  promise: Promise<R>,
): Promise<[R, undefined] | [undefined, E]> => {
  try {
    const result: R = await promise
    return [result, undefined]
  } catch (error) {
    return [undefined, error as E]
  }
}

export const settleSync = <R, E = Error>(func: () => R): [R, E] => {
  try {
    return [func(), null]
  } catch (error) {
    return [undefined, error]
  }
}
