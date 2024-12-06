/* eslint-disable @typescript-eslint/no-explicit-any -- lint 무시 */
import _ from "lodash"

export const createQueryParamString = (targetObj: Record<string, any>) => {
	let query = _.reduce(
		targetObj,
		(prev, value, key) => `${prev}${key}=${value}&`,
		"",
	)
	query = query.slice(0, query.length - 1)
	return query
}

export const createQueryParamObj = (query: string) => {
	const queryObj: Record<string, any> = _.reduce(
		_.split(query, "&"),
		(result, param) => {
			const [key, value] = _.split(param, "=")
			_.assignIn(result, { [key]: value })
			return result
		},
		{},
	)
	return queryObj
}

interface UrlParams {
	href: string
	query: Record<string, string>
}

export function buildUrl({ href, query }: UrlParams): string {
	const url = new URL(href, "http://placeholder.com")

	Object.entries(query).forEach(([key, value]) => {
		url.searchParams.append(key, value)
	})

	// Remove the base URL and return only the path and query string
	return `${url.pathname}${url.search}`
}
