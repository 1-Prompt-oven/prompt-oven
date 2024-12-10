import { MessageSquare, MoreVertical, Video } from "@repo/ui/lucide"
import { ChAvatar } from "@/components/chat/atom/ChAvatar.tsx"

interface ChatHeaderProps {
	name: string
	isActive?: boolean
	avatarSrc?: string
	onProfileClick?: () => void
	onOpenSidebar?: () => void
}

export function ChatHeader({
	name,
	isActive,
	avatarSrc,
	onProfileClick,
	onOpenSidebar,
}: ChatHeaderProps) {
	return (
		<div className="flex items-center justify-between border-b border-[#E3E8E7]/40 bg-[#111111] px-8 py-6">
			<div
				className="flex cursor-pointer items-center gap-2.5 hover:opacity-90"
				onClick={onProfileClick}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						onProfileClick?.()
					}
				}}>
				<ChAvatar src={avatarSrc} alt={name} size="sm" />
				<div className="flex flex-col">
					<h2 className="text-sm font-semibold text-[#404040]">{name}</h2>
					{isActive ? (
						<div className="flex items-center gap-1">
							<div className="h-2 w-2 rounded-full bg-[#00B307]" />
							<span className="text-sm text-[#A3A3A3]">Active Now</span>
						</div>
					) : null}
				</div>
			</div>

			<div className="flex items-center gap-3.5">
				<button
					type="button"
					className="rounded-full border border-[#E2ADFF] p-2.5 hover:bg-[#404040]/10"
					onClick={onOpenSidebar}>
					<MessageSquare className="h-5 w-5 text-[#E2ADFF]" />
				</button>
				<button
					type="button"
					className="rounded-full border border-[#E2ADFF] p-2.5 hover:bg-[#404040]/10">
					<Video className="h-5 w-5 text-[#E2ADFF]" />
				</button>
				<button
					type="button"
					className="rounded-full border border-[#E2ADFF] p-2.5 hover:bg-[#404040]/10">
					<MoreVertical className="h-5 w-5 text-[#E2ADFF]" />
				</button>
			</div>
		</div>
	)
}

/*
<button className="rounded-full border border-[#E2ADFF] p-2.5 hover:bg-[#404040]/10">
					<Search className="h-5 w-5 text-[#E2ADFF]" />
				</button>
				<button className="rounded-full border border-[#E2ADFF] p-2.5 hover:bg-[#404040]/10">
					<Phone className="h-5 w-5 text-[#E2ADFF]" />
				</button>
				<button className="rounded-full border border-[#E2ADFF] p-2.5 hover:bg-[#404040]/10">
					<Video className="h-5 w-5 text-[#E2ADFF]" />
				</button>
 */
