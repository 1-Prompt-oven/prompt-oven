import { FormLabel } from "../atom/FormLabel"
import { FormDescription } from "../atom/FormDescription"

interface FormFieldProps {
	id: string
	label: string
	required?: boolean
	description?: string
	error?: string
	children: React.ReactNode
}

export function FormField({
	id,
	label,
	required,
	description,
	error,
	children,
}: FormFieldProps) {
	return (
		<div className="space-y-2">
			<FormLabel htmlFor={id} required={required}>
				{label}
				{required && <span className="ml-1 text-purple-400">*</span>}
			</FormLabel>
			{children}
			{description && <FormDescription>{description}</FormDescription>}
			{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
		</div>
	)
}
