import { Input } from "@repo/ui/input"

export function PromptsFilterPrice({
	minValue = "",
	maxValue = "",
	minName = "",
	maxName = "",
	onMinChange,
	onMaxChange,
}: {
	minValue?: string
	maxValue?: string
	minName: string
	maxName: string
	onMinChange?: (value: string) => void
	onMaxChange?: (value: string) => void
}) {
	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-2">
				<Input
					type="number"
					name={minName}
					placeholder="Min"
					value={minValue ? parseInt(minValue) : ""}
					onChange={(e) => onMinChange?.(e.target.value)}
					className="border-none bg-white/10 text-white placeholder:text-white/70"
				/>
				<Input
					type="number"
					name={maxName}
					placeholder="Max"
					value={maxValue ? parseInt(maxValue) : ""}
					onChange={(e) => onMaxChange?.(e.target.value)}
					className="border-none bg-white/10 text-white placeholder:text-white/70"
				/>
			</div>
		</div>
	)
}
