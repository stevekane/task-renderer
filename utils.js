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
