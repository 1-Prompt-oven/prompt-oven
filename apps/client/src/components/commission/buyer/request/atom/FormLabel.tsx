import { Label } from "@repo/ui/label"

interface FormLabelProps {
	htmlFor: string
	children: React.ReactNode
	required?: boolean
}

export function FormLabel({ htmlFor, children, required }: FormLabelProps) {
	return (
		<Label htmlFor={htmlFor} className="text-sm font-medium text-gray-200">
			{children}
			{required && <span className="ml-1 text-purple-400">*</span>}
		</Label>
	)
}
