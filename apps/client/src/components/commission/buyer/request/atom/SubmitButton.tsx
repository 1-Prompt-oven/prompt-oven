import { Button } from "@repo/ui/button"

interface SubmitButtonProps {
	children: React.ReactNode
}

export function SubmitButton({ children }: SubmitButtonProps) {
	return (
		<Button
			type="submit"
			className="w-full bg-purple-600 text-white hover:bg-purple-700">
			{children}
		</Button>
	)
}
