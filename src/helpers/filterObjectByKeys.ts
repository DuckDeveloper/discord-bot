type FilterObjectByKeys = (obj: object, keys: string | []) => object

const filterObjectByKeys: FilterObjectByKeys = (obj, keys) => {
	 return Object.entries(obj).reduce((filteredObj, [key, value]: [never, any]) =>
		keys === key || keys.includes(key) ? filteredObj : { ...filteredObj, [key]: value }, {})
}

export default filterObjectByKeys