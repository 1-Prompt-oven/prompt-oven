"use client"

import React from "react"
import { Input } from "@repo/ui/input"
import { Button } from "@repo/ui/button"
import { ArrowRight } from "@repo/ui/lucide"

interface EmailInputProps {
	placeholder?: string
}

const EmailInput: React.FC<EmailInputProps> = ({
	placeholder = "Email here...",
}) => {
	return (
		<div className="relative w-full max-w-[670px]">
			<Input
				type="email"
				placeholder={placeholder}
				className="h-[50px] w-full rounded-[10px] border-none bg-[#1B1B1B] px-5 py-[15px] font-roboto text-[15px] font-medium text-[#969696] focus-visible:ring-0 focus-visible:ring-offset-0"
			/>
			<Button
				type="submit"
				variant="ghost"
				size="icon"
				className="absolute right-2 top-1/2 -translate-y-1/2 transform hover:bg-transparent"
				aria-label="Submit email">
				<ArrowRight className="h-[20px] w-[17px] text-[#969696]" />
			</Button>
		</div>
	)
}

export default EmailInput
