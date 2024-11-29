import { Button } from "@repo/ui/button"
import React from "react"

interface FailModalProps {
	isOpen: boolean
	onClose: () => void
	children?: React.ReactNode // children 프로퍼티 추가
}

const FailModal: React.FC<FailModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="rounded bg-white p-4 shadow-lg">
				<div className="mb-4">{children}</div>
				<Button
					onClick={onClose}
					className="w-full rounded px-4 py-2 text-white">
					<span>Close</span>
				</Button>
			</div>
		</div>
	)
}

export default FailModal
