import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@repo/ui/dialog"

interface FailBuyProps {
	isOpen: boolean
	setIsOpen: (value: boolean) => void
	content?: string
}

function FailBuy({ isOpen, setIsOpen, content }: FailBuyProps) {
	return (
		<div className="mx-auto my-5 flex justify-center">
			<Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
				<DialogContent className="gradient-filter h-[150px] w-[300px] rounded border-none">
					<DialogHeader>
						<DialogTitle className="font-bold text-white" />
						<DialogDescription className="font-bold text-white" />
						<div className="flex cursor-pointer select-none flex-col items-center justify-center text-sm font-bold text-[#C1C1C1] shadow-lg transition-shadow duration-200 hover:shadow-xl">
							{content && content !== "OVER" ? (
								<p>{content}</p>
							) : (
								<div className="flex flex-col items-center justify-center gap-1">
									<p>결제 정책에 의해</p>
									<p>1회 최대 4개까지 구매 가능합니다.</p>
								</div>
							)}
						</div>
					</DialogHeader>
					<div className="flex justify-center">
						<button
							type="button"
							onClick={() => setIsOpen(!isOpen)}
							className="flex w-[45%] items-center justify-center rounded-md bg-gradient-to-b from-orange-300 via-orange-500 to-orange-600 p-2 transition-transform duration-200 hover:scale-105 hover:bg-gradient-to-b hover:from-orange-400 hover:via-orange-500 hover:to-orange-600">
							<span className="font-semibold">확인</span>
						</button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default FailBuy
