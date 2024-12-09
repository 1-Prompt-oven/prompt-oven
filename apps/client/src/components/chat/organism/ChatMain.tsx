import { ChatHeader } from "@/components/chat/molecule/ChatHeader"
import { ChatInput } from "@/components/chat/molecule/ChatInput.tsx"
import { ChMessageBubble } from "@/components/chat/atom/ChMessageBubble.tsx"
import { ChAvatar } from "@/components/chat/atom/ChAvatar.tsx"

interface Message {
	id: string
	content: string
	timestamp: string
	isOwn: boolean
	hasRead?: boolean
}

interface ChatMainProps {
	messages: Message[]
	contact: {
		id: string
		name: string
		isActive?: boolean
		avatarSrc?: string
	}
	onProfileClick?: () => void
	onOpenSidebar?: () => void
}

export function ChatMain({
	messages,
	contact,
	onProfileClick,
	onOpenSidebar,
}: ChatMainProps) {
	return (
		<div className="flex h-full flex-1 flex-col overflow-hidden bg-[#424242]">
			<ChatHeader
				name={contact.name}
				isActive={contact.isActive}
				avatarSrc={contact.avatarSrc}
				onProfileClick={onProfileClick}
				onOpenSidebar={onOpenSidebar}
			/>

			<div className="flex-1 space-y-4 overflow-y-auto p-4 md:space-y-6 md:p-8">
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex items-end gap-4 ${message.isOwn ? "flex-row-reverse" : ""}`}>
						{!message.isOwn && (
							<ChAvatar src={contact.avatarSrc} alt={contact.name} size="sm" />
						)}
						<ChMessageBubble {...message} />
					</div>
				))}
			</div>

			<ChatInput />
		</div>
	)
}
