"use client"

import { Mic, Send } from "@repo/ui/lucide"
import type { FormEvent } from "react"
import { useState } from "react"

interface ChatInputProps {
	onSendMessage: (message: string) => void
	error?: string | null
	disabled?: boolean
	placeholder?: string
}
export function ChatInput({
	onSendMessage,
	error,
	disabled,
	placeholder = "메시지를 입력하세요...",
}: ChatInputProps) {
	const [inputMessage, setInputMessage] = useState("")

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (inputMessage.trim()) {
			onSendMessage(inputMessage.trim())
			setInputMessage("")
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="h-[5.25rem] border-t border-[#E3E8E7]/20 bg-[#111111] px-6 py-4">
			{error ? <p className="mb-2 text-sm text-red-500">{error}</p> : null}

			<div
				className={`flex items-center justify-between rounded-[25px] border border-[#E5EAEF] bg-[#404040] px-6 py-1.5 ${disabled ? "opacity-50" : ""}`}>
				<div className="flex flex-1 items-center gap-3">
					<button type="button" className="hover:opacity-80">
						<Mic className="h-6 w-6 text-[#A3A3A3]" />
					</button>
					<input
						type="text"
						value={inputMessage}
						onChange={(e) => setInputMessage(e.target.value)}
						placeholder={placeholder}
						disabled={disabled}
						className="flex-1 bg-transparent text-sm text-[#A3A3A3] placeholder:text-[#A3A3A3] focus:outline-none"
					/>
				</div>

				<div className="flex items-center gap-4">
					<button
						type="submit"
						className={`flex h-9 w-9 items-center justify-center rounded-full bg-[#75C1D9] hover:opacity-90 ${disabled ? "cursor-not-allowed" : ""}`}
						disabled={disabled}>
						<Send className="h-5 w-5 text-white" />
					</button>
				</div>
			</div>
		</form>
	)
}

/*

<button type="button" className="hover:opacity-80">
						<Smile className="h-6 w-6 text-[#A3A3A3]" />
					</button>
					<button type="button" className="hover:opacity-80">
						<Link2 className="h-6 w-6 text-[#A3A3A3]" />
					</button>

 */
