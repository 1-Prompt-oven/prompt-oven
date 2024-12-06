import type { PromptReviewType } from "@/types/review/reviewType"
import { ProductReviewDatas } from "@/dummy/review/productReviewDatas"

export async function getProductReview2(): Promise<PromptReviewType> {
	const res: PromptReviewType = await ProductReviewDatas
	// const res: ProfileMemberInfoType = await profileMemberInfoUndefineData

	//     const res = await fetch(`${process.env.API_BASE_URL}/v1/profile`, {
	//       method: 'GET',
	//       headers: {
	//         'Content-Type': 'application/json',
	//         Authorization: `Bearer ${auth.accessToken}`,
	//       },
	//       cache: 'no-cache',
	//     })

	return res
}
