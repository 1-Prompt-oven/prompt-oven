import { localStorageKeys } from "@/config/product/localStorage.ts"

export type LocalStorageKey = string
export type LocalStorageValue = string
export interface LocalStorageObject {
	key: LocalStorageKey
	value: LocalStorageValue
}

export const getStorageItem: (key: LocalStorageKey) => string = (
	key: LocalStorageKey,
) => {
	return localStorage.getItem(key) ?? ""
}

export const setStorageItem = (obj: LocalStorageObject) => {
	const { key, value } = obj
	localStorage.setItem(key, value)
	return { key, value }
}

export const removeStorageItem = (key: LocalStorageKey) => {
	localStorage.removeItem(key)
}

/**
 * @param obj - object containing the key and value to store in local storage
 * @param pr - predicate function to validate the key and value before storing
 * @param cb - callback function to execute based on success or failure
 */
export const setStorageItemBy = (
	obj: LocalStorageObject,
	pr: (obj: {
		key: LocalStorageKey
		preValue: LocalStorageValue
		newValue: LocalStorageValue
	}) => boolean,
	cb: {
		success: (newObj: LocalStorageObject) => void
		failure: (preObj: LocalStorageObject) => void
	},
) => {
	const { key, value } = obj
	const preValue = getStorageItem(key)

	if (pr({ key, preValue, newValue: value })) {
		setStorageItem(obj)
		cb.success(obj)
	}
	cb.failure({ key, value: preValue })
}

// Create Product Storage functions
// note: 중복되는 로직이 있으면 공통 함수로 빼서 사용하도록 합니다.
export const setProductUuid = (productUuid: string): string => {
	let _productUuid = ""
	const prevProductUuid = getStorageItem(localStorageKeys.curTempProductUuid)
	if (productUuid) {
		setStorageItem({
			key: localStorageKeys.curTempProductUuid,
			value: productUuid,
		})
		_productUuid = productUuid
	} else if (prevProductUuid) {
		_productUuid = prevProductUuid
	}
	return _productUuid
}
