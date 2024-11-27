export interface CommonResType<T = Record<string, never>> {
	httpStatus: string
	isSuccess: boolean
	message: string
	code: number
	result: T
}
