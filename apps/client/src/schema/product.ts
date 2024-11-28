import { z } from "zod"

export const createProductFirstSchema = z.object({
	llmId: z.number().int().positive("LLM ID를 입력해주세요"),
	productName: z.string({ message: "상품명을 입력해주세요." }),
	topCategoryUuid: z.string({ message: "상위 카테고리를 입력해주세요" }),
	subCategoryUuid: z.string({ message: "하위 카테고리를 입력해주세요" }),
	prompt: z.string({ message: "상품 소개를 입력해주세요." }),
	description: z.string({ message: "상품 설명을 입력해주세요." }),
	price: z.number().int().positive({ message: "가격을 입력해주세요." }),
	discountRate: z.number().optional(),
})
export const createProductFirstSchemaKeys =
	createProductFirstSchema.keyof().enum

export const createProductSecondSchema = z.object({
	contents: z.array(
		z.object({
			content: z.string({ message: "내용을 입력해주세요" }),
			contentType: z.string({ message: "콘텐츠 타입을 입력해주세요" }),
		}),
	),
	seed: z.string({ message: "시드를 입력해주세요" }),
	llmVersionId: z.number().int().positive("LLM 버전 ID를 입력해주세요"),
})
export const createProductSecondSchemaKeys =
	createProductSecondSchema.keyof().enum
