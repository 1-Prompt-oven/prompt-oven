import { Copy, Image, MoreVertical, X } from "@repo/ui/lucide"
import { ChAvatar } from "@/components/chat/atom/ChAvatar.tsx"
import { ChFileItem } from "@/components/chat/atom/ChFileItem.tsx"
import { ChProfileSection } from "@/components/chat/molecule/ChProfileSection.tsx"

interface ChatProfileSidebarProps {
	contact: {
		id: string
		name: string
		phone: string
		avatarSrc?: string
	}
	onClose: () => void
	isOpen: boolean
}

export function ChatProfileSidebar({
	contact,
	onClose,
	isOpen,
}: ChatProfileSidebarProps) {
	return (
		<div
			className={`h-full overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "w-full md:!w-80" : "!w-0"}`}>
			<div className="flex h-full w-full min-w-80 flex-col border-l border-[#424242] bg-[#111111] transition-all duration-300 ease-in-out">
				{/* Header */}
				<div className="flex justify-between p-4 md:p-6">
					<button
						type="button"
						onClick={onClose}
						className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[#E2ADFF]">
						<X className="h-5 w-5 text-[#E2ADFF]" />
					</button>
					<button
						type="button"
						className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[#E2ADFF]">
						<MoreVertical className="h-5 w-5 text-[#E2ADFF]" />
					</button>
				</div>

				{/* Profile Info */}
				<div className="mt-8 flex flex-col items-center gap-4 md:mt-20">
					<div className="relative">
						<ChAvatar src={contact.avatarSrc} alt={contact.name} size="lg" />
						<div className="absolute inset-0 flex items-center justify-center">
							<Image className="h-[30px] w-[30px] text-white" />
						</div>
					</div>
					<div className="text-center">
						<h2 className="mb-2.5 text-xl font-semibold text-white">
							{contact.name}
						</h2>
						<div className="flex items-center gap-3 text-white">
							<span>{contact.phone}</span>
							<button type="button" className="hover:opacity-80">
								<Copy className="h-5 w-5" />
							</button>
						</div>
					</div>
				</div>

				{/* Sections */}
				<div className="mt-8 overflow-y-auto px-4 md:px-5">
					<ChProfileSection title="Recent Files" subtitle="5 Files">
						<div className="space-y-3.5">
							<ChFileItem name="Content.pdf" size="20Mb" />
							<ChFileItem name="Branding.pdf" size="45Mb" />
							<ChFileItem name="Design changes.pdf" size="15Mb" />
						</div>
						<button type="button" className="mt-3.5 text-sm text-[#75C1D9]">
							Show more
						</button>
					</ChProfileSection>
				</div>

				{/* Actions */}
				<div className="mt-auto space-y-4 px-5 pb-5">
					<button
						type="button"
						className="h-[46px] w-full rounded-[52px] border border-[#E2ADFF] font-medium text-[#E2ADFF]">
						Block Lincoln
					</button>
				</div>
			</div>
		</div>
	)
}

/*

<ChProfileSection title="Notifications">
						<div className="flex items-center justify-between">
							<span className="text-white">Enable notifications</span>
							<ChToggleSwitch checked />
						</div>
					</ChProfileSection>

<ChProfileSection title="Images" subtitle="10 Files" />


 */
