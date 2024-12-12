import { Calendar, Copy, Image, MoreVertical, Users, X } from "@repo/ui/lucide"
import { ChAvatar } from "@/components/chat/atom/ChAvatar.tsx"
import { ChProfileSection } from "@/components/chat/molecule/ChProfileSection.tsx"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes.ts"
import { getKstTime } from "@/lib/time.ts"

interface ChatProfileSidebarProps {
	partner: ProfileMemberInfoType
	onClose: () => void
	isOpen: boolean
}

export function ChatProfileSidebar({
	partner,
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
				<div className="mt-4 flex flex-col items-center gap-4 md:mt-20">
					<div className="relative">
						<ChAvatar
							src={partner.avatarImageUrl}
							alt={partner.nickname}
							size="lg"
						/>
						<div className="absolute inset-0 flex items-center justify-center">
							<Image className="h-[30px] w-[30px] text-white" />
						</div>
					</div>
					<div className="text-center">
						<h2 className="mb-2.5 text-xl font-semibold text-white">
							{partner.nickname}
						</h2>
						{partner.email ? (
							<div className="flex items-center gap-3 text-white">
								<span>{partner.email}</span>
								<button type="button" className="hover:opacity-80">
									<Copy className="h-5 w-5" />
								</button>
							</div>
						) : null}
					</div>
				</div>

				{/* User Stats */}
				<div className="mt-6 flex justify-center space-x-6 text-center">
					<div>
						<p className="text-lg font-semibold text-white">
							{partner.following}
						</p>
						<p className="text-sm text-[#B1B1B1]">Following</p>
					</div>
					<div>
						<p className="text-lg font-semibold text-white">
							{partner.follower}
						</p>
						<p className="text-sm text-[#B1B1B1]">Followers</p>
					</div>
				</div>

				{/* Sections */}
				<div className="mt-8 overflow-y-auto px-4 md:px-5">
					<ChProfileSection title="User Info" subtitle="">
						<div className="space-y-3">
							<div className="flex items-center text-white">
								<Calendar className="mr-2 h-4 w-4 text-[#E2ADFF]" />
								<span className="text-sm">
									Joined {getKstTime(partner.joined).format("YYYY-MM-DD")}
								</span>
							</div>
							<div className="flex items-center text-white">
								<Users className="mr-2 h-4 w-4 text-[#E2ADFF]" />
								<span className="text-sm">
									{partner.following} Following • {partner.follower} Followers
								</span>
							</div>
						</div>
					</ChProfileSection>
				</div>

				{/* Actions */}
				<div className="mt-auto space-y-4 px-5 pb-5">
					<button
						type="button"
						className="h-[46px] w-full rounded-[52px] border border-[#E2ADFF] font-medium text-[#E2ADFF]">
						커미션 신청하기
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
