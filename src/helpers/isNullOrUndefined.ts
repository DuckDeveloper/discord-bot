type IsNullOrUndefined = (value: any) => boolean

const isNullOrUndefined: IsNullOrUndefined = value => value === null || value === undefined

export default isNullOrUndefined