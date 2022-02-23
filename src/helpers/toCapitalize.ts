type ToCapitalize = (str: string) => string

const toCapitalize: ToCapitalize = str => str[0].toUpperCase() + str.slice(1)

export default toCapitalize