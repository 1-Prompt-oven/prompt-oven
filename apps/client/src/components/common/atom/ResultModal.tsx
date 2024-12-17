import Link from "next/link"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@repo/ui/dialog"

interface ResultModalProps {
	content: { res: boolean; state: string }
	setContent: (content: { res: boolean; state: string }) => void
}

function ResultModal({ content, setContent }: ResultModalProps) {
	let contentKR = []
	if (content.state === "NoUser") {
		contentKR = ["회원이 아닙니다.", "로그인해주세요."]
	} else if (content.state === "already-Purchase") {
		contentKR = ["이미 구매한 상품입니다."]
	} else if (content.state === "resError") {
		contentKR = ["업데이트에 실패했습니다.", "다시 시도해주세요."]
	} else if (content.state === "unknown") {
		contentKR = ["알 수 없는 문제로 인해 실패했습니다.", "다시 시도해주세요."]
	} else contentKR = [""]

	return (
		<div className="mx-auto flex justify-center">
			<Dialog
				open={content.res}
				onOpenChange={() => setContent({ res: !content.res, state: "" })}>
				<DialogContent className="gradient-filter h-[150px] w-[300px] rounded border-none">
					<DialogHeader>
						<DialogTitle className="font-bold text-white" />
						<DialogDescription className="font-bold text-white" />
						<div className="flex cursor-pointer select-none flex-col items-center justify-center text-sm font-bold text-[#C1C1C1] shadow-lg transition-shadow duration-200 hover:shadow-xl">
							{contentKR.map((line) => (
								<div key={line} className="mb-1">
									{line}
								</div>
							))}
						</div>
					</DialogHeader>
					<div
						className={`flex items-center ${content.state === "NoUser" ? "justify-between" : "justify-center"} gap-3 text-white`}>
						<button
							type="button"
							onClick={() => setContent({ res: !content.res, state: "" })}
							className="flex w-[45%] items-center justify-center rounded-md bg-gradient-to-b from-orange-300 via-orange-500 to-orange-600 p-2 transition-transform duration-200 hover:scale-105 hover:bg-gradient-to-b hover:from-orange-400 hover:via-orange-500 hover:to-orange-600">
							<span className="font-semibold">확인</span>
						</button>

						{content.state === "NoUser" ? (
							<Link
								href="/sign-in"
								className="flex w-[45%] items-center justify-center rounded-md bg-gradient-to-b from-transparent via-black/5 to-black p-2 transition-transform duration-200 hover:scale-105 hover:bg-gradient-to-b hover:from-black/10 hover:via-black/20 hover:to-black">
								<span className="font-semibold">로그인하기</span>
							</Link>
						) : null}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default ResultModal
