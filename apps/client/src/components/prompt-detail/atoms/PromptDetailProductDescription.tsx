"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@repo/ui/card"
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@repo/ui/lucide"
import type { PromptDetailContentsType } from "@/types/prompt-detail/promptDetailType"
import type { CookieLatestType } from "@/types/cookie/cookieResponseType"
import PromptGenerate from "../molecules/generate/PromptGenerate"

interface PromptDetailContentProps {
	productContent: PromptDetailContentsType
	userCookie: CookieLatestType
}

export default function PromptDetailContent({
	productContent,
	userCookie,
}: PromptDetailContentProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	const toggleExecutionCode = () => {
		setIsExpanded(!isExpanded)
	}

	const [sliceLength, setSliceLength] = useState(50) // 기본 길이 설정
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 600) {
				setSliceLength(30) // 작은 화면에서는 30글자
			} else if (window.innerWidth < 900) {
				setSliceLength(40) // 중간 화면에서는 40글자
			} else {
				setSliceLength(50) // 큰 화면에서는 50글자
			}
		}
		handleResize()
		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	return (
		<div className="max-w-[820px]">
			<Card className="border-none bg-[#252525] shadow-lg">
				<CardContent className="p-6">
					<div className="flex justify-between">
						<div className="flex items-center gap-8">
							<p className="text-base font-bold text-white xs:!text-xl">
								Execution Code
							</p>
							<PromptGenerate
								keyWord={
									isExpanded
										? productContent.sampleValue
										: productContent.sampleValue.slice(0, sliceLength)
								}
								userCookie={userCookie}
							/>
						</div>

						{isExpanded ? (
							<ArrowUpCircleIcon
								className="cursor-pointer text-white"
								onClick={toggleExecutionCode}
							/>
						) : (
							<ArrowDownCircleIcon
								className="cursor-pointer text-white"
								onClick={toggleExecutionCode}
							/>
						)}
					</div>

					<p
						className={`mt-4 text-lg leading-relaxed text-[#969696] transition-all duration-500 ease-in-out ${
							isExpanded
								? "opacity-100"
								: "line-clamp-1 max-h-6 overflow-hidden opacity-50"
						}`}>
						{isExpanded ? (
							productContent.sampleValue
						) : (
							<span>
								<span>{productContent.sampleValue.slice(0, sliceLength)}</span>
								<span
									className="text-transparent text-white"
									style={{ filter: "blur(2px)" }}>
									........
								</span>
							</span>
						)}
					</p>
				</CardContent>
			</Card>
		</div>
	)
}
