import { Eye, EyeOff } from "@repo/ui/lucide"
import React from "react"

interface IconToggleProps {
	show: boolean
	onClick: () => void
}

export const IconToggle: React.FC<IconToggleProps> = ({ show, onClick }) => (
	<button
		onClick={onClick}
		className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70">
		{show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
	</button>
)
