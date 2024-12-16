import Link from "next/link"
import { Button } from "@repo/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@repo/ui/dialog"
import type { CookieLatestType } from "@/types/cookie/cookieResponseType"

interface PromptSampleExceptionProps {
	userCookie: CookieLatestType
	isOpen: boolean
	setIsOpen: (value: boolean) => void
}

export default function PromptSampleException({
	userCookie,
	isOpen,
	setIsOpen,
}: PromptSampleExceptionProps) {
	let contentKR = []
	let buttonName = ""
	let redirectUrl = ""
	if (!userCookie.isUser) {
		contentKR = ["회원이 아닙니다.", "로그인해주세요."]
		buttonName = "로그인 하기"
		redirectUrl = "/sign-in"
	} else if (userCookie.count < 1) {
		contentKR = ["쿠키가 부족합니다.", "쿠키를 충전해주세요."]
		buttonName = "쿠키 구매"
		redirectUrl = "/account?view=cookie"
	} else contentKR = [""]

	return (
		<div className="mx-auto flex justify-center">
			<Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
				<DialogTrigger asChild>
					<Button className="rounded-md bg-[#414141] px-4 py-1 text-xs font-semibold text-white hover:scale-105">
						<span>샘플 실행</span>
					</Button>
				</DialogTrigger>
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
					<div className="flex items-center justify-between gap-3 text-white">
						<button
							type="button"
							onClick={() => setIsOpen(!isOpen)}
							className="flex w-[45%] items-center justify-center rounded-md bg-gradient-to-b from-orange-300 via-orange-500 to-orange-600 p-2 transition-transform duration-200 hover:scale-105 hover:bg-gradient-to-b hover:from-orange-400 hover:via-orange-500 hover:to-orange-600">
							<span className="font-semibold">확인</span>
						</button>

						<Link
							href={redirectUrl}
							className="flex w-[45%] items-center justify-center rounded-md bg-gradient-to-b from-transparent via-black/5 to-black p-2 transition-transform duration-200 hover:scale-105 hover:bg-gradient-to-b hover:from-black/10 hover:via-black/20 hover:to-black">
							<span className="font-semibold">{buttonName}</span>
						</Link>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
