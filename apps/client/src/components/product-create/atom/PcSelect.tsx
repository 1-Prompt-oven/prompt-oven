import React from "react"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/custom-select"

interface SelectOption {
	value: string
	label: string
	id: string
}
interface PcSelectProps {
	onValueChange: (value: string) => void
	defaultValue?: string
	placeholder: string
	className?: string
	options: SelectOption[]
	variant?: "black" | "default"
}

function PcSelect({
	onValueChange,
	defaultValue,
	placeholder,
	className,
	options,
	variant = "black",
}: PcSelectProps) {
	return (
		<Select value={defaultValue} onValueChange={onValueChange}>
			<SelectTrigger variant={variant} className={className}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent variant={variant}>
				<SelectGroup>
					{options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

export default PcSelect
