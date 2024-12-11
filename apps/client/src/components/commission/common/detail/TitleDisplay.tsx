import React from "react"

interface TitleDisplayProps {
	title: string
}

function TitleDisplay({ title }: TitleDisplayProps) {
	return <h1 className="text-2xl font-bold text-white">{title}</h1>
}

export default TitleDisplay
