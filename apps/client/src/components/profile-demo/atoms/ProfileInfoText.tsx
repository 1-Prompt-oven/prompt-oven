import React from "react"

interface ProfileInfoTextProps {
	title: string
	discription: string
	name: string
	inputData: string | undefined
	placeholder: string
}

export default function ProfileInfoText({
	title,
	discription,
	name,
	inputData,
	placeholder,
}: ProfileInfoTextProps) {
	return (
		<div>
			<p className="text-sm font-bold text-white">{title}</p>
			<p className="mb-2 text-xs text-gray-500">{discription}</p>
			<div className="w-2/3">
				<textarea
					name={name}
					defaultValue={inputData}
					placeholder={placeholder}
					className="w-full bg-[#1b1b1b] py-2 pl-3 text-white"
				/>
			</div>
		</div>
	)
}
