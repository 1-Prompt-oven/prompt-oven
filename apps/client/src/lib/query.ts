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
