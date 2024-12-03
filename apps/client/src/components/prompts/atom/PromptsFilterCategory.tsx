import { RadioGroup, RadioGroupItem } from "@repo/ui/radio-group"
import { Label } from "@repo/ui/label"

const categories = [
	"Art",
	"fashion",
	"Music",
	"Video",
	"Games",
	"Sports",
	"Collectibles",
]

export function PromptsFilterCategory({
	value = "",
	name = "",
	onChange,
}: {
	value?: string
	name: string
	onChange?: (value: string) => void
}) {
	return (
		<RadioGroup value={value} onValueChange={onChange} name={name}>
			<ul className="grid grid-cols-3 space-y-2 md:grid-cols-1">
				{categories.map((category) => (
					<li key={category} className="flex items-center space-x-2">
						<RadioGroupItem
							value={category}
							id={category}
							className="border-white/70 text-white"
						/>
						<Label htmlFor={category} className="text-sm text-white">
							{category}
						</Label>
					</li>
				))}
			</ul>
		</RadioGroup>
	)
}

