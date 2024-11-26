import React from "react"

interface FavoriteLLMIdProps {
	llmId: number
}

export default function FavoriteLLMId({ llmId }: FavoriteLLMIdProps) {
	return <p className="font-lato text-xs text-[#827682]">{llmId}</p>
}
