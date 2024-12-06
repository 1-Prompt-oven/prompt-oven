import { Button } from "@repo/ui/button"
import React from "react"

interface SuccessModalProps {
	isOpen: boolean
	onClose: () => void
	children?: React.ReactNode // children 프로퍼티 추가
}

function SuccessModal({ isOpen, onClose, children }: SuccessModalProps) {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-slate-300 bg-opacity-40">
			<div className="rounded bg-[#242020] p-4 shadow-lg">
				<div className="mb-4 text-white">{children}</div>
				<Button
					onClick={onClose}
					className="w-full rounded bg-[#A913F9] px-4 py-2 text-white hover:bg-[#70219b]">
					<span>Close</span>
				</Button>
			</div>
		</div>
	)
}

export default SuccessModal
