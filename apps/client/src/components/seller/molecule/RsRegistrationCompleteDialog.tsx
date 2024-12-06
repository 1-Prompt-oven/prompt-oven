import React from "react"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@repo/ui/dialog"
import Link from "next/link"
import { RsButton } from "@/components/seller/atom/RsButton"

interface RegistrationCompleteDialogProps {
	isOpen: boolean
	onClose: () => void
}

export function RsRegistrationCompleteDialog({
	isOpen,
	onClose,
}: RegistrationCompleteDialogProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Registration Complete</DialogTitle>
					<DialogDescription>
						Your seller registration has been successfully submitted.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<RsButton onClick={onClose}>
						<Link href="/">Go to Main</Link>
					</RsButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
