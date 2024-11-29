import { useState } from "react"
import { Button } from "@repo/ui/button"
import FailModal from "@/components/common/atom/FailModal"

export default function PaymentOrderNone() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleButtonClick = () => {
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

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
					<p className="p-4 text-lg font-semibold">결제 방식을 체크해주세요</p>
				</div>
			</FailModal>
		</>
	)
}
