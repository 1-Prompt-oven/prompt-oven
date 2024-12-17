import { Button } from "@repo/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@repo/ui/dialog"

interface SuccessModalProps {
	isOpen: boolean
	onClose: () => void
	children?: React.ReactNode // children 프로퍼티 추가
}

function ResultModal({ isOpen, onClose, children }: SuccessModalProps) {
	if (!isOpen) return null
	return (
		<div className="mx-auto my-5 flex justify-center">
			<Dialog>
				<DialogContent className="gradient-filter h-[150px] w-[300px] rounded border-none">
					<DialogHeader>
						<DialogTitle className="font-bold text-white" />
						<DialogDescription className="font-bold text-white" />
						<div className="flex cursor-pointer select-none flex-col items-center justify-center text-sm font-bold text-[#C1C1C1] shadow-lg transition-shadow duration-200 hover:shadow-xl" />
					</DialogHeader>
					<div className="mb-4 text-white">{children}</div>
					<Button
						onClick={onClose}
						className="flex w-[45%] items-center justify-center rounded-md bg-gradient-to-b from-orange-300 via-orange-500 to-orange-600 p-2 transition-transform duration-200 hover:scale-105 hover:bg-gradient-to-b hover:from-orange-400 hover:via-orange-500 hover:to-orange-600">
						<span className="font-semibold">Close</span>
					</Button>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default ResultModal
