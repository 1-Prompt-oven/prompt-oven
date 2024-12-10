import { Textarea } from "@repo/ui/textarea"
import { Label } from "@repo/ui/label"

interface TextAreaFieldProps {
	id: string
	label: string
	placeholder?: string
	required?: boolean
}

export function TextAreaField({
	id,
	label,
	placeholder,
	required,
}: TextAreaFieldProps) {
	return (
		<div className="space-y-2">
			<Label htmlFor={id} className="text-sm font-medium text-gray-200">
				{label}
				{required ? <span className="ml-1 text-purple-400">*</span> : null}
			</Label>
			<Textarea
				id={id}
				placeholder={placeholder}
				className="min-h-[100px] border-gray-700 bg-gray-900 text-white"
				required={required}
			/>
		</div>
	)
}
