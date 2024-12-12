import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@repo/ui/dialog"
import Link from "next/link"

interface ResultModalProps {
	content: { res: boolean; state: string }
	setContent: (content: { res: boolean; state: string }) => void
}

function ResultModal({ content, setContent }: ResultModalProps) {
	let contentKR = []
	if (content.state === "NoUser") {
		contentKR = ["회원이 아닙니다.", "로그인해주세요."]
	} else if (content.state === "resError") {
		contentKR = ["업데이트에 실패했습니다.", "다시 시도해주세요."]
	} else {
		contentKR = ["알 수 없는 문제로 인해 실패했습니다.", "다시 시도해주세요."]
	}

	return (
		<div className="mx-auto my-5 flex justify-center">
			<Dialog
				open={content.res}
				onOpenChange={() => setContent({ res: !content.res, state: "" })}>
				<DialogContent className="h-[150px] w-[300px] rounded border-none bg-[#252525]">
					<DialogHeader>
						<DialogTitle className="font-bold text-white" />
						<DialogDescription className="flex flex-col items-center justify-center text-sm font-bold text-[#C1C1C1]">
							{contentKR.map((line) => (
								<div key={line} className="mb-1">
									{line}
								</div>
							))}
						</DialogDescription>
					</DialogHeader>
					<div
						className={`flex items-center ${content.state === "NoUser" ? "justify-between" : "justify-center"} gap-3 text-white`}>
						<button
							type="button"
							onClick={() => setContent({ res: !content.res, state: "" })}
							className="flex w-[45%] items-center justify-center rounded-md bg-gradient-to-b from-transparent via-orange-500 to-orange-700 p-2">
							<span className="font-semibold">확인</span>
						</button>
						<Link
							href="/sign-in"
							className={`${content.state === "NoUser" ? "flex" : "hidden"} w-[45%] items-center justify-center rounded-md bg-gradient-to-b from-transparent via-black/5 to-black p-2`}>
							<span className="font-semibold">로그인하기</span>
						</Link>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default ResultModal
