interface QueryParams {
	[key: string]: any
}

type BuildUrlStringByQueryParams = (url: string, queryParams: QueryParams) => string

const buildUrlStringByQueryParams: BuildUrlStringByQueryParams = (url, queryParams) => url +
	Object.entries(queryParams).reduce((queryUrl, [key, value]) => `${ queryUrl }${ key }=${ value }&`, '?')
		.slice(0, -1)

export default buildUrlStringByQueryParams