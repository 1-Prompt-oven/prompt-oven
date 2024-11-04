"use client"

import React, { useState } from "react"
import { Dialog, DialogContent } from "@repo/ui/dialog"
import { SigninForm } from "../organism/SigninForm"

export const SigninDialog: React.FC = () => {
	const [open, setOpen] = useState(true)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="bg-[#252525] p-8 sm:max-w-[800px]">
				<SigninForm />
			</DialogContent>
		</Dialog>
	)
}
