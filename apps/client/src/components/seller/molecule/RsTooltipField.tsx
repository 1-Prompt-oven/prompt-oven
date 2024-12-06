import React, { forwardRef } from "react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@repo/ui/tooltip"
import { RsFormField } from "@/components/seller/molecule/RsFormField.tsx"

interface TooltipFieldProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
	id: string
	label: string
	error?: string
	tooltipContent: string
}

export const RsTooltipField = forwardRef<HTMLInputElement, TooltipFieldProps>(
	({ label, error, tooltipContent, ...props }, ref) => {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<RsFormField label={label} error={error} ref={ref} {...props} />
					</TooltipTrigger>
					<TooltipContent>
						<p>{tooltipContent}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
	},
)

RsTooltipField.displayName = "RsTooltipField"
