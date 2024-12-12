import React from "react"

interface PromptNameProps {
	name: string
}

export default function PromptName({ name }: PromptNameProps) {
	return (
		<h3 className="font-lato xxs:!text-balance line-clamp-1 text-sm font-semibold text-white xs:line-clamp-2">
			{name}
		</h3>
	)
}
