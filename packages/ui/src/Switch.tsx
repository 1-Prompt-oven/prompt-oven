"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

export interface SwitchProps
	extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
		VariantProps<typeof switchRootVariants> {
	ThumbProps?: React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Thumb>
}

// note : root variants와 thumb variants의 타입은 동일해야함
const switchRootVariants = cva(
	"peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"data-[state=checked]:bg-black data-[state=unchecked]:bg-input",
				purple:
					"data-[state=checked]:bg-po-purple-100 data-[state=unchecked]:bg-input",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
)
const switchThumbVariants = cva(
	"pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
	{
		variants: {
			variant: {
				default: "bg-background",
				purple: "bg-[#1B1818]",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
)

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	SwitchProps
>(({ ThumbProps, variant, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(switchRootVariants({ variant }), props.className)}
		{...props}
		ref={ref}>
		<SwitchPrimitives.Thumb
			{...ThumbProps}
			className={cn(switchThumbVariants({ variant }), ThumbProps?.className)}
		/>
	</SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
