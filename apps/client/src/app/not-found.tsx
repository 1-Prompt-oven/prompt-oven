"use client"

import NotFoundAnimation from "@/components/not-found/NotFoundAnimation"
import NotFoundContent from "@/components/not-found/NotFoundContent"

export default function NotFound() {
	return (
		<div className="flex h-screen flex-col justify-center bg-black text-white">
			<div className="flex flex-col items-center gap-8">
				<NotFoundAnimation />
				<NotFoundContent />
			</div>
		</div>
	)
}
