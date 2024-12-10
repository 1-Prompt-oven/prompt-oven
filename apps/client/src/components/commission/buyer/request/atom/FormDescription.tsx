interface FormDescriptionProps {
	children: React.ReactNode
}

export function FormDescription({ children }: FormDescriptionProps) {
	return <p className="text-sm text-gray-400">{children}</p>
}
