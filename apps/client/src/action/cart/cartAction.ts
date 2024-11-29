/* eslint-disable no-console -- 개발 중 디버깅을 위해 console 사용을 허용 */
"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption"
import type { CartItemType } from "@/types/cart/cartTypes"
import type {
	CommonResType,
	PromptApiResponseType,
	CartItemApiResponseType,
} from "@/types/common/responseType"

export async function getCartData(): Promise<CartItemType[]> {
	"use server"

	const session = await getServerSession( authOptions )
	if (!session) {
		throw new Error("로그인이 필요합니다")
	}
	const token = session.user?.accesstoken
	console.log("token", token)
	const memberUUID = session.user?.memberUUID
	console.log("memberUUID", memberUUID)


	try {
		// 장바구니 데이터 가져오기
		const response = await fetch(
			`${process.env.API_BASE_URL}/v1/member/cart/list/${session.user?.memberUUID}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		)
		if (!response.ok) {
			throw new Error("카트 데이터 가져오기 실패")
		}
		const responseData = await response.json()
		console.log("카트 데이터 가져오기 성공", responseData)
		const cartItems = responseData.result
		return cartItems
	}
	catch (error) {
		console.error("카트 데이터 가져오기 실패", error)
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

	
}

export async function deleteCartItemList(itemIds: string[]): Promise<boolean> {
	"use server"
	try {
		const deletePromises = itemIds.map((id) => deleteCartItem(id))
		await Promise.all(deletePromises)
		return true
	} catch (error) {
		 
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
