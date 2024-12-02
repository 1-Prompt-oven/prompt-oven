import type {
	GetCategoryListRequestType,
	GetCategoryListResponseType,
} from "@/types/product/productCategory.ts"
import { actionHandler } from "@/action/actionHandler.ts"
import type { CommonResType } from "@/types/common/responseType.ts"

// /v1/product/category/sub-categories
// parentCategoryCode 미입력시 최상위 카테고리 리스트 조회
export const getProductCategoryList = async (
	req: GetCategoryListRequestType,
): Promise<CommonResType<GetCategoryListResponseType[]>> => {
	return actionHandler<CommonResType<GetCategoryListResponseType[]>>({
		name: "getProductCategoryList",
		url: `/v1/product/category/sub-categories?${req.parentCategoryUuid ? `parentCategoryUuid=${req.parentCategoryUuid}` : ""}`,
		options: {
			method: "GET",
			cache: "no-cache",
		},
	})
}
