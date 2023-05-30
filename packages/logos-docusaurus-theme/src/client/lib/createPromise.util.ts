export const createPromise = <T = any>() => {
  let resolve: any, reject: any

  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  const callback = (data: T, error?: Error) => {
    if (error) return void reject(error)
    return void resolve(data)
  }

  return {
    reject,
    resolve,
    promise,

    callback,
  }
}
