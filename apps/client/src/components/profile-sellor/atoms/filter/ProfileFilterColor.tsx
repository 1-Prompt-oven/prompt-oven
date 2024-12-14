"use client"

const colors = [
	{ name: "Blue", value: "#3772FF" },
	{ name: "Purple", value: "#5D5FEF" },
	{ name: "Pink", value: "#EF5DA8" },
	{ name: "Red", value: "#FF4E4E" },
	{ name: "Green", value: "#21A85A" },
	{ name: "Mint", value: "#37FFC3" },
	{ name: "White", value: "#FFFFFF" },
]

export function ProfileFilterColor({
	selected = [],
	onChange,
}: {
	selected?: string[]
	onChange?: (values: string[]) => void
}) {
	return (
		<div className="flex flex-wrap gap-2">
			{colors.map((color) => (
				<button
					type="button"
					key={color.value}
					className={`h-8 w-8 rounded-full ${
						selected.includes(color.value)
							? "ring-2 ring-white ring-offset-2"
							: ""
					}`}
					style={{ backgroundColor: color.value }}
					onClick={() => {
						if (selected.includes(color.value)) {
							onChange?.(selected.filter((v) => v !== color.value))
						} else {
							onChange?.([...selected, color.value])
						}
					}}
					aria-label={`Select ${color.name}`}
				/>
			))}
		</div>
	)
}

