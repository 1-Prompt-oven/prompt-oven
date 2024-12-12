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
import ResultModal from "@/components/common/atom/ResultModal"
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
	const [modalContent, setModalContent] = useState<{
		res: boolean
		state: string
	}>({ res: false, state: "" })

	useEffect(() => {
		const fetchState = async () => {
			const favoriteState = await getFavoriteState(productUuid)
			const cartState = await getCartStateAction(productUuid)
			setIsFavorite(favoriteState)
			setIsCart(cartState)
		}

		fetchState()
	}, [productUuid])

	const likeHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault() //눌렀을 때, 새로고침 방지

		const likeResponse = await changeFavoriteAction(productUuid)
		if (likeResponse.result.res) {
			setIsFavorite((prev) => ({ liked: !prev.liked }))
			return
		}

		if (likeResponse.result.state === "NoUser")
			setModalContent({ res: true, state: "NoUser" })
		else setModalContent({ res: true, state: "resError" })
	}

	const cartHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault() //눌렀을 때, 새로고침 방지
		let response

		if (isCart !== null) {
			response = await changeCartState(isCart)
		} else {
			response = await createCart(productUuid)
		}

		const result = response.result

		if (result.res) {
			setIsCart(result.cartId)
			return
		}
		if (result.state === "NoUser")
			setModalContent({ res: true, state: "NoUser" })
		else setModalContent({ res: true, state: "resError" })
	}

	return (
		<>
			<div className="mr-2 flex flex-row justify-between gap-6 xs:gap-0 xl:mr-4">
				<div className="flex gap-6">
					<Button
						variant="outline"
						className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-none bg-white p-0 hover:scale-105 xs:h-[60px] xs:w-[60px]"
						onClick={likeHandler}>
						{isFavorite.liked ? (
							<Heart className="scale-150 transform fill-[#ef4444] text-[#ef4444] transition-transform duration-300 ease-in-out" />
						) : (
							<Heart className="scale-100 transform text-[#ef4444] transition-transform duration-300 ease-in-out" />
						)}
					</Button>

					<Button
						variant="outline"
						className="h-[40px] w-[40px] rounded-full border-none bg-gradient-to-r from-[#A913F9] to-[#3F5EFB] p-0 hover:scale-105 xs:h-[60px] xs:w-[60px]"
						onClick={cartHandler}>
						{isCart !== null ? (
							<ShoppingCartIcon className="scale-150 fill-white text-white transition-transform duration-300 ease-in-out hover:opacity-90" />
						) : (
							<ShoppingCartIcon className="scale-100 text-white transition-transform duration-300 ease-in-out hover:opacity-90" />
						)}
					</Button>
				</div>

				<PromptDetailGet productUuid={productUuid} />
			</div>

			<ResultModal content={modalContent} setContent={setModalContent} />
		</>
	)
}
