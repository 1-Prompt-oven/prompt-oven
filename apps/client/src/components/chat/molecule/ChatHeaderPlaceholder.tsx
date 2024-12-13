import { Menu } from "@repo/ui/lucide"

export function ChatHeaderPlaceholder() {
	return (
		<div className="flex items-center justify-between border-b border-[#E3E8E7]/20 bg-[#111111] px-6 py-4">
			<div className="flex items-center">
				<button type="button" className="mr-4 md:hidden">
					<Menu className="h-6 w-6 text-[#E2ADFF]" />
				</button>
				<h2 className="text-lg font-semibold text-[#E2ADFF]">채팅</h2>
			</div>
			<div className="h-10 w-10 rounded-full bg-[#404040]" />{" "}
			{/* Placeholder for avatar */}
		</div>
	)
}
