"use client"

import { useState } from "react"
import { Button } from "@repo/ui/button"
import CookiePurchaseModal from "../atom/CookieChargeModal"

function CookieCharge() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const handleConfirm = () => {
		setIsModalOpen(false)
	}
	return (
		<div>
			<Button
				className="w-full bg-purple-600 text-white hover:bg-purple-700"
				onClick={() => setIsModalOpen(true)}>
				쿠키 구매
			</Button>
			<CookiePurchaseModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleConfirm}
			/>
		</div>
	)
}

export default CookieCharge
