import React from "react"

interface PromptLLMIdProps {
	llmId: string | number | null
}

export default function PromptLLMId({ llmId }: PromptLLMIdProps) {
	return <p className="font-lato text-xs text-[#827682]">{llmId}</p>
}
