import React from "react"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/custom-select"

type Value = string
interface SelectOption {
	value: Value
	label: string
}
interface PcSelectProps {
	onValueChange: (value: string) => void
	defaultValue?: Value
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
