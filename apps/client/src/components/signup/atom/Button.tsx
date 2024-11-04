import React from "react"
import { Button } from "@repo/ui/button"

interface ValidateButtonProps {
	text: string
	onClick?: () => void
}

function ValidateButton({ text, onClick }: ValidateButtonProps) {
	return <Button onClick={onClick}>{text}</Button>
}

export default ValidateButton
