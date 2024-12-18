import Link from "next/link"
import React from "react"

export default function CookieSuccessLinkPage() {
	return (
		<div className="m-auto flex h-full flex-col items-center justify-center gap-4 text-white">
			<p className="text-2xl font-bold">결제 성공하였습니다.</p>
			<Link
				href="/account?view=cookie"
				className="rounded-md bg-[#1b1b1b] px-10 py-4 hover:bg-[#252525]">
				<span className="font-semibold">구매 내역으로 이동하기</span>
			</Link>
		</div>
	)
}
