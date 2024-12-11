"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@repo/ui/button"
import { Heart, ShoppingCartIcon } from "@repo/ui/lucide"
import {
	changeCartState,
	changeFavoriteAction,
	createCart,
	getCartStateAction,
	getFavoriteState,
	getProductDetail,
} from "@/action/prompt-detail/getProductDetailData"
import type { PromptItemType } from "@/types/prompts/promptsType"
import type { PromptDetailContentsType } from "@/types/prompt-detail/promptDetailType"

interface PromptHoverModalProps {
	productInfo: PromptItemType
	defaultImage: string
}

export default function PromptHoverModal({
	productInfo,
	defaultImage,
}: PromptHoverModalProps) {
	const [isFavorite, setIsFavorite] = useState<{ liked: boolean }>({
		liked: false,
	})
	const [isCart, setIsCart] = useState<number | null>(null)
	const [allImage, setAllImage] = useState<PromptDetailContentsType[]>([])
	const productUuid = productInfo.productUuid

	useEffect(() => {
		const fetchState = async () => {
			const imgUrlArray = await getProductDetail(productInfo.productUuid)
			const favoriteState = await getFavoriteState(productUuid)
			const cartState = await getCartStateAction(productUuid)
			setAllImage(imgUrlArray.contents)
			setIsFavorite(favoriteState)
			setIsCart(cartState)
		}

		fetchState()
	}, [productUuid])

	const likeHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault() //눌렀을 때, 새로고침 방지

		const isSuccess = await changeFavoriteAction(productUuid)
		if (isSuccess) setIsFavorite((prev) => ({ liked: !prev.liked }))
		else {
			// eslint-disable-next-line no-console -- Fail to Update Like
			console.log("좋아요 버튼 업데이트에 실패했습니다.")
		}
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

	const getImageClassName = (index: number): string => {
		if (index === 0) {
			return "rounded-tl-md"
		} else if (index === 1) {
			return "rounded-tr-md"
		}
		return ""
	}

	// allImage가 있을 때만 UI를 렌더링
	if (allImage.length === 0) {
		return null // allImage가 없으면 null을 반환하여 아무것도 렌더링하지 않음
	}

	return (
		<div className="gradient-filter absolute top-10 z-30 w-[300px] rounded-md border border-white/20 p-4 shadow-lg">
			<div className="flex flex-col items-center gap-2">
				<div className="rounded-md bg-[#3d2d50]">
					<Link href={`/prompt-detail/${productInfo.productUuid}`}>
						{allImage.length > 1 && allImage[0].contentUrl ? (
							<ul className="grid grid-cols-2">
								{allImage.map((item, index) => (
									<li key={item.contentUrl}>
										<Image
											src={item.contentUrl}
											width={300}
											height={300}
											className={getImageClassName(index)}
											alt={productInfo.productName}
											priority
											unoptimized
										/>
									</li>
								))}
							</ul>
						) : (
							<Image
								src={defaultImage}
								width={300}
								height={300}
								className="rounded-t-md"
								alt={productInfo.productName}
								priority
								unoptimized
							/>
						)}
					</Link>

					<div className="flex items-center justify-end rounded-b-md border-none bg-white p-0">
						<Button
							className="h-[30px] w-[30px] border border-white bg-white hover:bg-[#ffeaea]"
							onClick={likeHandler}>
							{isFavorite.liked ? (
								<Heart className="scale-125 transform fill-[#ef4444] text-[#ef4444] transition-transform duration-300 ease-in-out" />
							) : (
								<Heart className="scale-100 transform text-[#ef4444] transition-transform duration-300 ease-in-out" />
							)}
						</Button>

						<Button
							className="h-[30px] w-[30px] border border-white bg-white hover:bg-[#ffeaea]"
							onClick={cartHandler}>
							{isCart !== null ? (
								<ShoppingCartIcon className="scale-125 fill-[#3F5EFB] text-[#3F5EFB] transition-transform duration-300 ease-in-out hover:opacity-90" />
							) : (
								<ShoppingCartIcon className="scale-100 text-[#3F5EFB] transition-transform duration-300 ease-in-out hover:opacity-90" />
							)}
						</Button>
					</div>
				</div>

				<Link href={`/prompt-detail/${productInfo.productUuid}`}>
					<p className="text-xs font-semibold text-white">
						{productInfo.productName}
					</p>
				</Link>
			</div>
		</div>
	)
}
