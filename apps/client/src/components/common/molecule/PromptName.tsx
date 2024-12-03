import React from "react"

interface PromptNameProps {
	name: string
}

export default function PromptName({ name }: PromptNameProps) {
	return (
		<h3 className="font-lato line-clamp-2 text-base font-semibold text-white">
			{name}
		</h3>
	)
}
