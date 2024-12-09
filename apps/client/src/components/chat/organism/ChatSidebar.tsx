import { MessageSquarePlus, MoreVertical, Search, X } from "@repo/ui/lucide"
import { ChAvatar } from "@/components/chat/atom/ChAvatar.tsx"

interface Contact {
	id: string
	name: string
	message: string
	time: string
	unread?: number
	avatarSrc?: string
}

interface ChatSidebarProps {
	contacts: Contact[]
	onSelectContact: (id: string) => void
	selectedId?: string
	onClose: () => void
}

export function ChatSidebar({
	contacts,
	onSelectContact,
	selectedId,
	onClose,
}: ChatSidebarProps) {
	return (
		<div className="flex h-full w-full flex-col border-r border-r-[#E3E8E7]/50 bg-[#111111] md:!w-[424px]">
			<div className="flex items-center justify-between border-b border-[#A913F9] p-4 md:!p-6">
				<h1 className="text-lg font-semibold text-[#E2ADFF]">Messages</h1>
				<div className="flex items-center gap-3.5">
					<button
						className="rounded-full border border-[#9F9F9F] p-2.5 hover:bg-[#404040]/10 md:!hidden"
						onClick={onClose}>
						<X className="h-5 w-5 text-[#E2ADFF]" />
					</button>
					<button className="rounded-full border border-[#9F9F9F] p-2.5 hover:bg-[#404040]/10">
						<Search className="h-5 w-5 text-[#E2ADFF]" />
					</button>
					<button className="rounded-full border border-[#9F9F9F] p-2.5 hover:bg-[#404040]/10">
						<MessageSquarePlus className="h-5 w-5 text-[#E2ADFF]" />
					</button>
					<button className="rounded-full border border-[#9F9F9F] p-2.5 hover:bg-[#404040]/10">
						<MoreVertical className="h-5 w-5 text-[#E2ADFF]" />
					</button>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto">
				{contacts.map((contact) => (
					<button
						key={contact.id}
						onClick={() => onSelectContact(contact.id)}
						className={`flex items-center gap-2.5 p-6 transition-colors hover:bg-[#404040] ${
							selectedId === contact.id ? "bg-[#404040]" : ""
						}`}>
						<ChAvatar src={contact.avatarSrc} alt={contact.name} />
						<div className="flex-1 text-left">
							<h3 className="text-sm font-semibold text-[#E2ADFF]">
								{contact.name}
							</h3>
							<p className="line-clamp-2 text-xs text-[#B1B1B1]">
								{contact.message}
							</p>
						</div>
						<div className="flex flex-col items-end gap-4">
							<span className="text-xs text-[#B1B1B1]">{contact.time}</span>
							{contact.unread ? (
								<span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#A913F9] text-xs text-[#111111]">
									{contact.unread}
								</span>
							) : null}
						</div>
					</button>
				))}
			</div>
		</div>
	)
}
