import { CommonResType } from "@/types/common/responseType"

export const fetchDataRevaliDateTime = async <T>(
	url: string,
	revalidateTime: number,
): Promise<T> => {
	const res = await fetch(url, {
		method: "GET",
		next: { revalidate: 3600 * revalidateTime }, // 캐싱 설정
	})

	if (!res.ok) {
		throw new Error(`Failed to fetch data from ${url}`)
	}

	const data = (await res.json()) as CommonResType<T>
	return data.result
}

export const fetchDataNoCache = async <T>(url: string): Promise<T> => {
	const res = await fetch(url, {
		method: "GET",
		cache: "no-cache",
	})

	if (res.ok) {
		const data = (await res.json()) as CommonResType<T>
		return data.result
	}
	return [] as unknown as T
}

export const fetchDataRevaliDateTags = async <T>(
	url: string,
	tagList: string[],
): Promise<T> => {
	const res = await fetch(url, {
		method: "GET",
		next: { tags: tagList },
	})

	if (!res.ok) {
		throw new Error(`Failed to fetch data from ${url}`)
	}

	const data = (await res.json()) as CommonResType<T>
	return data.result
}

export const fetchData = async <T>(url: string): Promise<T> => {
	const res = await fetch(url, {
		method: "GET",
	})

	if (!res.ok) {
		throw new Error(`Failed to fetch data from ${url}`)
	}

	const data = (await res.json()) as CommonResType<T>
	return data.result
}
