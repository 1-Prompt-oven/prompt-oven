import { Input } from "@repo/ui/input"
import { Label } from "@repo/ui/label"

interface InputFieldProps {
	id: string
	label: string
	type?: string
	placeholder?: string
	required?: boolean
}

export function InputField({
	id,
	label,
	type = "text",
	placeholder,
	required,
}: InputFieldProps) {
	return (
		<div className="space-y-2">
			<Label htmlFor={id} className="text-sm font-medium text-gray-200">
				{label}
				{required ? <span className="ml-1 text-purple-400">*</span> : null}
			</Label>
			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				className="border-gray-700 bg-gray-900 text-white"
				required={required}
			/>
		</div>
	)
}
