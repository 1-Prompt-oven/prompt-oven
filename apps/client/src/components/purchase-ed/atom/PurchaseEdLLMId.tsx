import React from "react"

interface PurchaseEdLLMIdProps {
	llmId: number
}

export default function PurchaseEdLLMId({ llmId }: PurchaseEdLLMIdProps) {
	return <p className="font-lato text-xs text-[#827682]">{llmId}</p>
}
