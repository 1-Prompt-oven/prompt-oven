import { z } from "zod"

export const sellerInfoSchema = z.object({
	taxID: z
		.string()
		.regex(/^\d{10}$|^\d{13}$/, { message: "10자리 또는 13자리여야 합니다." }),
	accountID: z.string().min(1, { message: "은행 계좌는 필수 항목입니다." }),
	bankName: z.string().min(1, { message: "은행 이름은 필수 항목입니다." }),
	phone: z.string().regex(/^\d{10,11}$/, {
		message: "전화번호는 10자리 또는 11자리여야 합니다.",
	}),
})

export const addressSchema = z.object({
	postcode: z.string().min(1, { message: "우편번호는 필수 항목입니다." }),
	address: z.string().min(1, { message: "주소는 필수 항목입니다." }),
	detailAddress: z.string().optional(),
})

export type SellerInfo = z.infer<typeof sellerInfoSchema>
export type AddressInfo = z.infer<typeof addressSchema>

export const sellerInfoSchemaKeys = sellerInfoSchema.keyof().enum
export const addressSchemaKeys = addressSchema.keyof().enum
