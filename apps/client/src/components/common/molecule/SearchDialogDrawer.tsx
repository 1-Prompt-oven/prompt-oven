import React, { useEffect, useState } from "react"
import { Button } from "@repo/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	// DialogTrigger,
} from "@repo/ui/dialog"
import {
	Drawer,
	// DrawerClose,
	DrawerContent,
	DrawerDescription,
	// DrawerFooter,
	// DrawerHeader,
	DrawerTitle,
	// DrawerTrigger,
} from "@repo/ui/drawer"
import { X } from "@repo/ui/lucide"
import SearchContent from "./SearchContent"

interface SearchDialogDrawerWrapperProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	isOpen: boolean
}

export interface SearchQueryType {
	keyword: string
	tabName: string
}

export function SearchDialogDrawer({
	setIsOpen,
	isOpen,
}: SearchDialogDrawerWrapperProps) {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768)
		}
		handleResize()
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	const closeDialog = () => {
		setIsOpen(false)
	}

	return (
		<>
			{isMobile ? (
				<Drawer open={isOpen} onOpenChange={closeDialog}>
					<DrawerContent className="border-zinc-80 mb-3 min-h-[60%] w-[100vw] bg-zinc-900/95 p-5">
						<DialogHeader>
							<DrawerTitle className="hidden">Search</DrawerTitle>
							<DrawerDescription className="hidden">
								Search for prompts or creators
							</DrawerDescription>
						</DialogHeader>
						<SearchContent closeDialog={closeDialog} />
					</DrawerContent>
				</Drawer>
			) : (
				<Dialog open={isOpen} onOpenChange={closeDialog}>
					<DialogContent
						className="border-[1px] border-fuchsia-500 bg-black"
						style={{
							boxShadow: "0px 8px 20px rgba(169, 19, 249, 0.80)",
						}}>
						<DialogHeader>
							<DialogTitle className="hidden">Search</DialogTitle>
							<DialogDescription className="hidden">
								Search for prompts or creators
							</DialogDescription>
							<Button
								variant="ghost"
								className="text-muted-foreground absolute right-4 top-2 mt-1.5 h-6 w-6 p-0"
								onClick={closeDialog}>
								<X className="!h-6 !w-6" color="white" />
								<span className="sr-only">Close</span>
							</Button>
						</DialogHeader>
						<SearchContent closeDialog={closeDialog} />
					</DialogContent>
				</Dialog>
			)}
		</>
	)
}

