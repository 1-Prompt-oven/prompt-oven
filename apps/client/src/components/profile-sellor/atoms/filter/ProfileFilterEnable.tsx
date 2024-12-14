import { CheckBox } from "@repo/ui/checkbox"
import { Label } from "@repo/ui/label"

const statuses = ["상품 활성화"]

export function ProfileFilterEnable({
	values = [],
	name = "",
	onChange,
}: {
	values?: string[]
	name: string
	onChange?: (values: string[]) => void
}) {
	return (
		<div className="space-y-2">
			{statuses.map((enable) => (
				<div key={enable} className="flex items-center space-x-2">
					<CheckBox
						id={enable}
						name={name}
						defaultChecked
						// checked={values.includes(enable)}
						onCheckedChange={(checked) => {
							if (checked) {
								onChange?.([...values, enable])
							} else {
								onChange?.(values.filter((v) => v !== enable))
							}
						}}
						className="border-white/70 text-white"
					/>
					<Label htmlFor={enable} className="text-sm text-white">
						{enable}
					</Label>
				</div>
			))}
		</div>
	)
}
