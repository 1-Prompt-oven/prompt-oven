import React from "react"
import { Button } from "@repo/ui/button"

interface ValidateButtonProps {
	text: string
}

function SignupButton({ text }: ValidateButtonProps) {
	return <Button>{text}</Button>
}

export default SignupButton
