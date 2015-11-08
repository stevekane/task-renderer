export function pp (obj) {
  console.log(JSON.stringify(obj, null, 2))
}

export const log = console.log.bind(console)

//shallow clone -- not ideal as might trigger dictionary mode?
export function clone (obj) {
  let out = {}

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) out[key] = obj[key] 
  } 
  return out
}

//mutative!
export function extend (obj, next) {
  for (let key in next) {
    if (next.hasOwnProperty(key)) obj[key] = next[key]
  } 
  return obj
}

export function find (predFn, array) {
  for (let item of array) {
    if (predFn(item)) return item
  }
  return null
}

export function findWhere(key, val, array) {
  for (let item of array) {
    if (item[key] === val) return item 
  }
  return null
}
