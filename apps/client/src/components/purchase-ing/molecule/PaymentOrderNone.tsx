import { useState } from "react"
import { Button } from "@repo/ui/button"
import FailBuy from "@/components/common/atom/FailBuyModal"

export default function PaymentOrderNone({ state }: { state: number }) {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleButtonClick = () => {
		setIsModalOpen(true)
	}

	let content
	if (state === 1) content = "주문 상품이 없습니다."
	else if (state === 2) content = "결제 방식을 체크해주세요"
	else content = "OVER" //4개 초과 상품일 때 결제 못하도록 함.

	return (
		<>
			<Button
				type="button"
				className="bg-[#9747ff] text-white hover:bg-[#743dbd]"
				onClick={handleButtonClick}>
				<span>Order Now</span>
			</Button>

			<FailBuy
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				content={content}
			/>
		</>
	)
}
