import { useState } from "react"
import { Button } from "@repo/ui/button"
import FailModal from "@/components/common/atom/FailModal"

export default function PaymentOrderNone({ state }: { state: number }) {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleButtonClick = () => {
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	const content =
		state === 1 ? "주문 상품이 없습니다." : "결제 방식을 체크해주세요"

	return (
		<>
			<Button
				type="button"
				className="bg-[#9747ff] text-white hover:bg-[#743dbd]"
				onClick={handleButtonClick}>
				<span>Order Now</span>
			</Button>

			<FailModal isOpen={isModalOpen} onClose={handleCloseModal}>
				<div className="rounded-md bg-[#eeeeee]">
					<p className="p-4 text-lg font-semibold">{content}</p>
				</div>
			</FailModal>
		</>
	)
}
