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
		<div className="my-5r mx-auto">
			<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-300 bg-opacity-40">
				<div className="gradient-filter flex h-[180px] w-[300px] flex-col items-center justify-center gap-5 rounded bg-white p-4 shadow-lg">
					<div className="mb-4 font-bold text-white">{children}</div>
					<Button
						onClick={onClose}
						className="flex w-[45%] items-center justify-center rounded-md bg-gradient-to-b from-orange-300 via-orange-500 to-orange-600 p-2 transition-transform duration-200 hover:scale-105 hover:bg-gradient-to-b hover:from-orange-400 hover:via-orange-500 hover:to-orange-600">
						<span>Close</span>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default SuccessModal
