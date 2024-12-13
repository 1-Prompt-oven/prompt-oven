import * as React from "react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@repo/ui/custom-chat-accordion"

interface ProfileSectionProps {
	title: string
	subtitle?: string
	children?: React.ReactNode
	defaultOpen?: boolean
}

export function ChProfileSection({
	title,
	subtitle,
	children,
	defaultOpen = true,
}: ProfileSectionProps) {
	return (
		<Accordion
			type="single"
			collapsible
			defaultValue={defaultOpen ? title : undefined}>
			<AccordionItem value={title} className="border-t border-[#424242] py-5">
				<AccordionTrigger className="hover:no-underline">
					<div className="flex w-full items-center justify-between">
						<div>
							<h3 className="text-left text-base font-medium text-white">
								{title}
							</h3>
							{subtitle ? (
								<p className="text-left text-xs text-[#A3A3A3]">{subtitle}</p>
							) : null}
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent>{children}</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
