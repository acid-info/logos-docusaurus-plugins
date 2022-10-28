import * as _ from 'lodash'

export const defaultsDeep = (objects: any[], mergeArrays: boolean = false) => {
  if (mergeArrays) return _.defaultsDeep(...(objects as [any, any]))

  let output = {}

  objects.reverse().forEach((item) => {
    _.mergeWith(output, item, (objectValue, sourceValue) => {
      return Array.isArray(sourceValue) ? sourceValue : undefined
    })
  })

  return output
}
