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
	// 프롬프트 API를 호출에 필요한 값을 준비하기 위한 변수
	// 프롬프트 변수 input list
	promptVars: z.array(
		z.object({
			name: z.string(),
			value: z.string({ message: "내용을 입력해주세요" }),
		}),
	),
	// 프롬프트 input list 값에 의한 결과 output
	promptResult: z.string(),

	// 프롬프트 API를 호출하는데 쓰이는 변수
	contents: z.array(
		z.object({
			name: z.string(),
			value: z.record(z.string()),
			result: z.string(),
		}),
	),
	seed: z.string({ message: "시드를 입력해주세요" }),
	llmVersionId: z.string({ message: "AI 모델을 선택해주세요" }),
})
export const createProductSecondSchemaKeys =
	createProductSecondSchema.keyof().enum
