import { Button } from "@repo/ui/button"

interface PromptSidebarButtonGroupProps {
	onClear: () => void
}

export default function PromptSidebarButtonGroup({
	onClear,
}: PromptSidebarButtonGroupProps) {
	return (
		<div className="mt-4 flex gap-2">
			<Button
				variant="secondary"
				type="button"
				className="flex-1 bg-[#35314D] text-white hover:bg-[#35314D]/90"
				onClick={onClear}>
				<span className="font-semibold">Clear</span>
			</Button>
			<Button
				className="flex-1 bg-[#F24E1E] text-white hover:bg-[#F24E1E]/90"
				type="submit">
				<span className="font-semibold">Apply</span>
			</Button>
		</div>
	)
}
