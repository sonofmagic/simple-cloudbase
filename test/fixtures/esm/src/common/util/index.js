import forIn from 'lodash/forIn'

export function isPlainObject (obj) {
  let result = !(obj === null || obj === undefined)
  forIn(obj, () => {
    result = false
    return false
  })
  return result
}

export function isHasKeyObject (obj) {
  if (typeof obj === 'object') {
    let result = false
    forIn(obj, () => {
      result = true
      return false
    })
    return result
  } else {
    return false
  }
}
