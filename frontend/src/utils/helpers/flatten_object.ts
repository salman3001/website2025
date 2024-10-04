export function flattenObject(obj: Record<any, any>, prefix = '') {
  const result = {}

  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      const nested = flattenObject(obj[key], `${prefix}${key}.`)
      Object.assign(result, nested)
    } else {
      // @ts-ignore
      result[`${prefix}${key}`] = obj[key]
    }
  }

  return result
}
