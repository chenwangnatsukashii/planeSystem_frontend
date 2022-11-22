export function isEmpty(o) {
  return Object.is(o, undefined) || Object.is(o, null) || Object.is(o, "")
}
