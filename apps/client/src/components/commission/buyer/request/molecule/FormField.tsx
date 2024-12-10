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
			</FormLabel>
			{children}
			{description ? <FormDescription>{description}</FormDescription> : null}
			{error ? <p className="mt-1 text-sm text-red-500">{error}</p> : null}
		</div>
	)
}
