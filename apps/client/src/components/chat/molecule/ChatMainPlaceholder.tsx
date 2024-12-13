"use client"

import { MessageSquare } from "@repo/ui/lucide"
import { ChatHeaderPlaceholder } from "@/components/chat/molecule/ChatHeaderPlaceholder.tsx"
import { ChatInput } from "@/components/chat/molecule/ChatInput.tsx"

export function ChatPlaceholder() {
	return (
		<div className="flex h-full flex-col bg-[#424242]">
			<ChatHeaderPlaceholder />

			<div className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">
				<MessageSquare className="mb-4 h-16 w-16 text-[#E2ADFF]" />
				<h2 className="mb-2 text-2xl font-semibold text-[#E2ADFF]">
					채팅을 시작하세요
				</h2>
				<p className="text-center text-[#B1B1B1]">
					채팅을 진행하려면 채팅방을 선택해주세요
				</p>
			</div>

			<div className="mt-auto">
				<ChatInput
					onSendMessage={() => {
						// Do nothing
					}}
					disabled
					placeholder="채팅방을 선택하세요..."
				/>
			</div>
		</div>
	)
}
