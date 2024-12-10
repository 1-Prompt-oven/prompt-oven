interface ValidationErrorProps {
	message: string
}

export function ValidationError({ message }: ValidationErrorProps) {
	return <p className="mt-1 text-sm text-red-500">{message}</p>
}
