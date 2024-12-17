"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@repo/ui/button"
import { ShoppingBag } from "@repo/ui/lucide"
import { checkIsMember } from "@/action/prompt-detail/getProductDetailFollowData"
import { createCart } from "@/action/prompt-detail/getProductDetailData"
import ResultModal from "@/components/common/atom/ResultModal"

export default function PromptDetailGet({
	productUuid,
	purchaseState,
}: {
	productUuid: string
	purchaseState: boolean
}) {
	const router = useRouter()

	const [modalContent, setModalContent] = useState<{
		res: boolean
		state: string
	}>({ res: false, state: "" })

	const getHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()

		const getResponse = await checkIsMember()
		if (!getResponse) {
			setModalContent({ res: true, state: "NoUser" })
			return
		} else if (purchaseState) {
			setModalContent({ res: true, state: "already-Purchase" })
			return
		}

		const requestCart = await createCart(productUuid)
		if (requestCart.result.res) router.push("/account?view=cart")
	}

	return (
		<div>
			<Button
				type="button"
				onClick={getHandler}
				className="h-[40px] rounded-full bg-gradient-to-r from-[#FC466B] to-[#AD20F2] text-lg font-semibold text-white hover:scale-105 xs:h-[60px]">
				<ShoppingBag className="mx-2 h-5 w-5" />

				<p className="flex gap-2 pr-2">
					GET <span className="hidden xs:!block">PROMPT</span>
				</p>
			</Button>

			<ResultModal content={modalContent} setContent={setModalContent} />
		</div>
	)
}
