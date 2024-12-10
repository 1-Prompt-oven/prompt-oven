import React from "react"
import { Button } from "@repo/ui/button"
import { ShoppingBag } from "@repo/ui/lucide"

export default function PromptDetailGet() {
	return (
		<div>
			<Button className="h-[40px] rounded-full bg-gradient-to-r from-[#FC466B] to-[#AD20F2] text-lg font-semibold text-white xs:h-[60px]">
				<ShoppingBag className="mx-2 h-5 w-5" />

				<p className="flex gap-2 pr-2">
					GET <span className="hidden xs:!block">PROMPT</span>
				</p>
			</Button>
		</div>
	)
}
