import React from "react"
import { Button } from "../../../../../../packages/ui/src/Button"

interface ValidateButtonProps {
	text: string
}

function SignupButton({ text }: ValidateButtonProps) {
	console.log(text)
	return <Button>{text}</Button>
}

export default SignupButton
