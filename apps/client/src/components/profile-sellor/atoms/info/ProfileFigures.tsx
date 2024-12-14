import React from "react"

interface ProfileFiguresProps {
	title: string
	content: number | string
}

export default function ProfileFigures({
	title,
	content,
}: ProfileFiguresProps) {
	return (
		<div className="flex min-w-0 items-center justify-center gap-1 md:flex-col">
			<span className="font-mulish text-gray-200 md:text-sm xl:text-base 2xl:text-xl">
				{title}
			</span>
			<span className="font-mulish text-[10px] font-bold text-white xl:text-xs 2xl:text-sm">
				{content}
			</span>
		</div>
	)
}
