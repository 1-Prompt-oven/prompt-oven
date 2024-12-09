import { Link2, Mic, Send, Smile } from "@repo/ui/lucide"

export function ChatInput() {
	return (
		<div className="border-t border-[#E3E8E7]/20 bg-[#111111] px-6 py-4">
			<div className="flex items-center justify-between rounded-[25px] border border-[#E5EAEF] bg-[#404040] px-6 py-1.5">
				<div className="flex flex-1 items-center gap-3">
					<button className="hover:opacity-80">
						<Mic className="h-6 w-6 text-[#A3A3A3]" />
					</button>
					<input
						type="text"
						placeholder="Enter Message..."
						className="flex-1 bg-transparent text-sm text-[#A3A3A3] placeholder:text-[#A3A3A3] focus:outline-none"
					/>
				</div>

				<div className="flex items-center gap-4">
					<button className="hover:opacity-80">
						<Smile className="h-6 w-6 text-[#A3A3A3]" />
					</button>
					<button className="hover:opacity-80">
						<Link2 className="h-6 w-6 text-[#A3A3A3]" />
					</button>
					<button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#75C1D9] hover:opacity-90">
						<Send className="h-5 w-5 text-white" />
					</button>
				</div>
			</div>
		</div>
	)
}
