import React from "react"
import type { LabelProps } from "@repo/ui/label"
import { Label } from "@repo/ui/label"

interface PcLabelProps extends LabelProps {
	children?: React.ReactNode
}

function PcLabel({ children, ...props }: PcLabelProps) {
	return (
		<Label {...props} className="text-sm text-white">
			{children}
		</Label>
	)
}

export default PcLabel
