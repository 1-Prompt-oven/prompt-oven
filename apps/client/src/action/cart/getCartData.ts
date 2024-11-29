/* eslint-disable no-console -- 개발 중 디버깅을 위해 console 사용을 허용 */
"use server"
import type { CartItemType } from "@/types/cart/cartTypes"
import type {
	CommonResType,
	PromptApiResponseType,
	CartItemApiResponseType,
} from "@/types/common/responseType"

export async function getCartData(
	_memberUuid: string,
): Promise<CartItemType[]> {
	"use server"
	try {
		// 장바구니 데이터 가져오기
		const response = await fetch(
			`${process.env.API_BASE_URL}/v1/member/cart/299b66a0-e1e7-448e-b396-ba681fcc2aea`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAtNTEyIn0.rIDp9pRwV8IWnlIZLdRQtoRTLyQ47RFoqYm-8U2cAaRAUJJw3c-oR5auhWow3-5YJVirLQAhMUygSWDihWCgaBrFVV7ZXn5usTuluYOz5LydUUvT9NfXIzeCY2xWTieZolE_5Cj8K0_vdwsNkxMdoO60V3qROF432TypZT42Vnbdghn1aebT629RrFcpzSzdt6nFcv4CoJLmZCOxs5cc24VsnOzVUsb66gL_m7Y3dGXh4CpPKBIaNegkvUjtKsWaeBqsLa6grM-GJfqk7P8mF5Wy2eYJQbUZR8Eg2I9x_-nxYZuBq6QINRVPgxWO59GQ5T52YiakTR1gONhb3BC6sQ.WFy4UPMPbmudXLve.DPu86u_k7bAmux6mDJsZKC9KKsR2jKxVTijmGMwIwiBROA3vinXqIE5zJlZRoaH9-z2ysh6Z_ZfuvOOS0vIPPNgravpbsuiuPE7L3BpfsqU61Z78nuJom1UrQtL10ksxA8JiCjmdtEYEVWACcIH17A1E7VEOUpHqdPRx5i2A-3Dyyj5z3iZ7g1B4in2nX0Ag9T-_2Bu5UNp4UTwA8GuQFrGLSM-xAgZJw1Dz7jfHH_Ye00a-Ya2FBK0w9GKBVuo6sX2LhyFzmaqWdickiFoRx1Mz1zGWUBc8FStw-y3nufTJZx5XGT1uag.J5qYLix7M9OouEna_ic88Q`,
				},
			},
		)
		if (!response.ok) {
			throw new Error("카트 데이터 가져오기 실패")
		}
		const data: CommonResType<CartItemApiResponseType[]> = await response.json()
		const cartItems = data.result

		// 상품 상세 데이터 요청
		const productDetailsPromises = cartItems.map(async (cartItem) => {
			const productResponse = await fetch(
				`${process.env.API_BASE_URL}/v1/product/${cartItem.productUuid}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAtNTEyIn0.rIDp9pRwV8IWnlIZLdRQtoRTLyQ47RFoqYm-8U2cAaRAUJJw3c-oR5auhWow3-5YJVirLQAhMUygSWDihWCgaBrFVV7ZXn5usTuluYOz5LydUUvT9NfXIzeCY2xWTieZolE_5Cj8K0_vdwsNkxMdoO60V3qROF432TypZT42Vnbdghn1aebT629RrFcpzSzdt6nFcv4CoJLmZCOxs5cc24VsnOzVUsb66gL_m7Y3dGXh4CpPKBIaNegkvUjtKsWaeBqsLa6grM-GJfqk7P8mF5Wy2eYJQbUZR8Eg2I9x_-nxYZuBq6QINRVPgxWO59GQ5T52YiakTR1gONhb3BC6sQ.WFy4UPMPbmudXLve.DPu86u_k7bAmux6mDJsZKC9KKsR2jKxVTijmGMwIwiBROA3vinXqIE5zJlZRoaH9-z2ysh6Z_ZfuvOOS0vIPPNgravpbsuiuPE7L3BpfsqU61Z78nuJom1UrQtL10ksxA8JiCjmdtEYEVWACcIH17A1E7VEOUpHqdPRx5i2A-3Dyyj5z3iZ7g1B4in2nX0Ag9T-_2Bu5UNp4UTwA8GuQFrGLSM-xAgZJw1Dz7jfHH_Ye00a-Ya2FBK0w9GKBVuo6sX2LhyFzmaqWdickiFoRx1Mz1zGWUBc8FStw-y3nufTJZx5XGT1uag.J5qYLix7M9OouEna_ic88Q`,
					},
					next: { revalidate: 1800 },
				},
			)

			if (!productResponse.ok) {
				throw new Error(`상품 상세 정보 가져오기 실패: ${cartItem.productUuid}`)
			}

			const productData: CommonResType<PromptApiResponseType> =
				await productResponse.json()

			return productData.result.productList[0]
		})

		// 모든 상품 정보 병렬 요청
		const productDetails = await Promise.all(productDetailsPromises)

		// LLM 모델명 요청
		const llmModelNamePromises = productDetails.map(async (product) => {
			const llmResponse = await fetch(
				`${process.env.API_BASE_URL}/v1/llm/${product.llmId}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAtNTEyIn0.rIDp9pRwV8IWnlIZLdRQtoRTLyQ47RFoqYm-8U2cAaRAUJJw3c-oR5auhWow3-5YJVirLQAhMUygSWDihWCgaBrFVV7ZXn5usTuluYOz5LydUUvT9NfXIzeCY2xWTieZolE_5Cj8K0_vdwsNkxMdoO60V3qROF432TypZT42Vnbdghn1aebT629RrFcpzSzdt6nFcv4CoJLmZCOxs5cc24VsnOzVUsb66gL_m7Y3dGXh4CpPKBIaNegkvUjtKsWaeBqsLa6grM-GJfqk7P8mF5Wy2eYJQbUZR8Eg2I9x_-nxYZuBq6QINRVPgxWO59GQ5T52YiakTR1gONhb3BC6sQ.WFy4UPMPbmudXLve.DPu86u_k7bAmux6mDJsZKC9KKsR2jKxVTijmGMwIwiBROA3vinXqIE5zJlZRoaH9-z2ysh6Z_ZfuvOOS0vIPPNgravpbsuiuPE7L3BpfsqU61Z78nuJom1UrQtL10ksxA8JiCjmdtEYEVWACcIH17A1E7VEOUpHqdPRx5i2A-3Dyyj5z3iZ7g1B4in2nX0Ag9T-_2Bu5UNp4UTwA8GuQFrGLSM-xAgZJw1Dz7jfHH_Ye00a-Ya2FBK0w9GKBVuo6sX2LhyFzmaqWdickiFoRx1Mz1zGWUBc8FStw-y3nufTJZx5XGT1uag.J5qYLix7M9OouEna_ic88Q`,
					},
					next: { revalidate: 86400 },
				},
			)

			if (!llmResponse.ok) {
				throw new Error(`LLM 모델명 가져오기 실패: ${product.llmId}`)
			}

			const llmData: CommonResType<{ modelName: string }> =
				await llmResponse.json()

			return { llmId: product.llmId, modelName: llmData.result.modelName }
		})

		// 모든 LLM 모델명 병렬 요청
		const llmModelNames = await Promise.all(llmModelNamePromises)

		// 상품 정보와 장바구니 데이터 매핑
		const finalCartData: CartItemType[] = cartItems.map((cartItem) => {
			const product = productDetails.find(
				(p) => p.productUuid === cartItem.productUuid,
			)
			if (!product) {
				throw new Error(
					`uuid에 해당하는 프롬프트 못 찾음: ${cartItem.productUuid}`,
				)
			}
			const llmModel = llmModelNames.find((llm) => llm.llmId === product.llmId)
			if (!llmModel) {
				throw new Error(`LLM 모델명 못 찾음: ${product.llmId}`)
			}
			return {
				id: cartItem.id,
				memberUuid: cartItem.memberUuid,
				productUuid: product.productUuid,
				productName: product.productName,
				price: product.price,
				selected: cartItem.selected,
				thumbnailUrl: product.thumbnailUrl,
				llmName: llmModel.modelName,
			}
		})

		return finalCartData
	} catch (error) {
		console.error("카트 데이터 fetching 실패", error)
		return []
	}
}

export async function deleteCartItem(itemId: string): Promise<void> {
	"use server"
	const response = await fetch(`${process.env.API_BASE_URL}/v1/member/cart`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ itemId }),
	})
	const responseData: CommonResType = await response.json()

	if (!responseData.isSuccess) {
		throw new Error("Failed to delete cart item")
	}

	return
}

export async function deleteCartItemList(itemIds: string[]): Promise<boolean> {
	"use server"
	try {
		const deletePromises = itemIds.map((id) => deleteCartItem(id))
		await Promise.all(deletePromises)
		return true
	} catch (error) {
		// eslint-disable-next-line no-console -- 에러 로그 출력을 위해 콘솔 출력 필요함.
		console.error("여러 상품 삭제 fetching 실패", error)
		return false
	}
}

export const cartCheckUpdate = async (
	item: CartItemType,
	selected: boolean,
): Promise<boolean> => {
	"use server"
	const res = await fetch(`${process.env.API_BASE_URL}/v1/member/cart`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAtNTEyIn0.rIDp9pRwV8IWnlIZLdRQtoRTLyQ47RFoqYm-8U2cAaRAUJJw3c-oR5auhWow3-5YJVirLQAhMUygSWDihWCgaBrFVV7ZXn5usTuluYOz5LydUUvT9NfXIzeCY2xWTieZolE_5Cj8K0_vdwsNkxMdoO60V3qROF432TypZT42Vnbdghn1aebT629RrFcpzSzdt6nFcv4CoJLmZCOxs5cc24VsnOzVUsb66gL_m7Y3dGXh4CpPKBIaNegkvUjtKsWaeBqsLa6grM-GJfqk7P8mF5Wy2eYJQbUZR8Eg2I9x_-nxYZuBq6QINRVPgxWO59GQ5T52YiakTR1gONhb3BC6sQ.WFy4UPMPbmudXLve.DPu86u_k7bAmux6mDJsZKC9KKsR2jKxVTijmGMwIwiBROA3vinXqIE5zJlZRoaH9-z2ysh6Z_ZfuvOOS0vIPPNgravpbsuiuPE7L3BpfsqU61Z78nuJom1UrQtL10ksxA8JiCjmdtEYEVWACcIH17A1E7VEOUpHqdPRx5i2A-3Dyyj5z3iZ7g1B4in2nX0Ag9T-_2Bu5UNp4UTwA8GuQFrGLSM-xAgZJw1Dz7jfHH_Ye00a-Ya2FBK0w9GKBVuo6sX2LhyFzmaqWdickiFoRx1Mz1zGWUBc8FStw-y3nufTJZx5XGT1uag.J5qYLix7M9OouEna_ic88Q`,
		},
		body: JSON.stringify({
			cartId: item.id,
			selected,
		}),
	})
	const responseData: CommonResType = await res.json()
	const isSuccess = responseData.isSuccess
	return isSuccess
}
