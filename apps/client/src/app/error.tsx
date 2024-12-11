"use client"

import ErrorAnimation from "@/components/error/ErrorAnimation"
import ErrorContent from "@/components/error/ErrorContent"

export default function NotFound() {
	return (
		<div className="flex h-screen flex-col justify-center bg-black text-white">
			<div className="flex flex-col items-center gap-8">
				<ErrorAnimation />
				<ErrorContent />
			</div>
		</div>
	)
}
