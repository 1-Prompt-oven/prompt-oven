"use client"

import { useEffect, useState } from "react"
import { Button } from "@repo/ui/button"
import { Heart, ShoppingCartIcon } from "@repo/ui/lucide"
import {
	changeFavoriteAction,
	getCartState,
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
	const [isCart, setIsCart] = useState<boolean>(false)

	useEffect(() => {
		const fetchState = async () => {
			const favoriteState = await getFavoriteState(productUuid)
			const cartState = await getCartState(productUuid)
			setIsFavorite(favoriteState)
			setIsCart(cartState)
		}

		fetchState()
	}, [productUuid])

	const likeHandler = async () => {
		await changeFavoriteAction(productUuid)
		setIsFavorite((prev) => ({ liked: !prev.liked }))
	}

	return (
		<div className="mr-2 flex flex-col justify-between gap-6 xs:!flex-row xs:gap-0 xl:mr-4">
			<div className="flex gap-6">
				<Button
					variant="outline"
					className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-none bg-white p-0"
					onClick={likeHandler}>
					{isFavorite.liked ? (
						<Heart className="scale-110 transform fill-[#ef4444] text-[#ef4444] transition-transform duration-300 ease-in-out" />
					) : (
						<Heart className="scale-100 transform text-[#ef4444] transition-transform duration-300 ease-in-out" />
					)}
				</Button>

				<Button
					variant="outline"
					className="h-[60px] w-[60px] rounded-full border-none bg-gradient-to-r from-[#A913F9] to-[#3F5EFB] p-0">
					{isCart ? (
						<ShoppingCartIcon className="fill-white text-white hover:opacity-90" />
					) : (
						<ShoppingCartIcon className="text-white hover:opacity-90" />
					)}
				</Button>
			</div>

			<PromptDetailGet />
		</div>
	)
}
