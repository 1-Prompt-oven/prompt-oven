"use client"

import { useEffect, useState } from "react"
import { Button } from "@repo/ui/button"
import { Heart, ShoppingCartIcon } from "@repo/ui/lucide"
import {
	changeCartState,
	changeFavoriteAction,
	createCart,
	getCartStateAction,
	getFavoriteState,
} from "@/action/prompt-detail/getProductDetailData"
import PromptDetailGet from "../atoms/PromptDetailGet"

interface PromptDetailChoiceProps {
	productUuid: string
}

export default function PromptDetailChoice({
	productUuid,
}: PromptDetailChoiceProps) {
	const [isFavorite, setIsFavorite] = useState<{ liked: boolean }>({
		liked: false,
	})
	const [isCart, setIsCart] = useState<number | null>(null)

	useEffect(() => {
		const fetchState = async () => {
			const favoriteState = await getFavoriteState(productUuid)
			const cartState = await getCartStateAction(productUuid)
			setIsFavorite(favoriteState)
			setIsCart(cartState)
		}

		fetchState()
	}, [productUuid])

	const likeHandler = async () => {
		const isSuccess = await changeFavoriteAction(productUuid)
		if (isSuccess) setIsFavorite((prev) => ({ liked: !prev.liked }))
		else {
			// eslint-disable-next-line no-console -- Fail to Update Like State
			console.log("좋아요 버튼 업데이트에 실패했습니다.")
		}
	}

	const cartHandler = async () => {
		let response

		if (isCart !== null) {
			response = await changeCartState(isCart)
		} else {
			response = await createCart(productUuid)
		}

		const result = response.result

		if (result.res) {
			setIsCart(result.cartId)
		}
		if (result.state === "NoUser")
			// eslint-disable-next-line no-console -- Fail to Update Cart State1
			console.log("사용자가 없습니다.")
		else if (result.state === "resError")
			// eslint-disable-next-line no-console -- Fail to Update Cart State2
			console.log("장바구니 업데이트 요청에 실패했습니다.")
		// eslint-disable-next-line no-console -- Fail to Update Cart State3
		else console.log("알 수 없는 오류가 발생했습니다.")
	}

	return (
		<div className="mr-2 flex flex-col justify-between gap-6 xs:!flex-row xs:gap-0 xl:mr-4">
			<div className="flex gap-6">
				<Button
					variant="outline"
					className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-none bg-white p-0"
					onClick={likeHandler}>
					{isFavorite.liked ? (
						<Heart className="scale-150 transform fill-[#ef4444] text-[#ef4444] transition-transform duration-300 ease-in-out" />
					) : (
						<Heart className="scale-100 transform text-[#ef4444] transition-transform duration-300 ease-in-out" />
					)}
				</Button>

				<Button
					variant="outline"
					className="h-[60px] w-[60px] rounded-full border-none bg-gradient-to-r from-[#A913F9] to-[#3F5EFB] p-0"
					onClick={cartHandler}>
					{isCart !== null ? (
						<ShoppingCartIcon className="scale-150 fill-white text-white transition-transform duration-300 ease-in-out hover:opacity-90" />
					) : (
						<ShoppingCartIcon className="scale-100 text-white transition-transform duration-300 ease-in-out hover:opacity-90" />
					)}
				</Button>
			</div>

			<PromptDetailGet />
		</div>
	)
}
