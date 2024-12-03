"use client"

import { useState } from "react"
import { Menu } from "@repo/ui/lucide"
import { Button } from "@repo/ui/button"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@repo/ui/sheet"
import { useSearchParams } from "next/navigation"
import SideMenuToggleItem from "@/components/account/molecule/SideMenuToggleItem.tsx"
import SideMenuItem from "@/components/account/atom/SideMenuItem.tsx"
import { routes } from "@/config/account/route.ts"
import { sellerNavs } from "@/lib/navigation.ts"

export function SideBarMenu() {
	const [open, setOpen] = useState(false)
	const searchParams = useSearchParams()
	const viewQuery = searchParams.get("view") ?? ""

	// todo: 유저의 권한에 따라 다른 메뉴를 보여줘야함
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="!h-12 !w-12 rounded-full border-none p-0 hover:!bg-transparent focus-visible:!ring-0 lg:!hidden"
					onClick={() => setOpen(true)}>
					<Menu className="!h-7 !w-7 text-white" />
					<span className="sr-only">Toggle menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side="left"
				isClose={false}
				className="common-scrollbar-y flex w-[18.75rem] border-r-0 bg-po-black-200 !pr-2 sm:w-[22.5rem]">
				<SheetHeader className="hidden">
					<SheetTitle>SideBarMenu</SheetTitle>
					<SheetDescription>
						This is a sidebar menu for the users.
					</SheetDescription>
				</SheetHeader>
				<nav className="w-full space-y-4 overflow-y-auto">
					{sellerNavs.map((item, index) =>
						item.subMenu ? (
							<SideMenuToggleItem
								// eslint-disable-next-line react/no-array-index-key -- This is a static array
								key={index}
								view={item.query}
								label={item.label}
								activeRoute={viewQuery}
								Icon={item.icon}
								subMenu={item.subMenu}
								subMenuProps={{ onClick: () => setOpen(false) }}
								containerProps={{
									className:
										"w-[calc(18.75rem-3.25rem)] sm:w-[calc(22.5rem-3.25rem)]",
								}}
							/>
						) : (
							<SideMenuItem
								// eslint-disable-next-line react/no-array-index-key -- This is a static array
								key={index}
								href={{
									pathname: routes.account,
									query: { view: item.query },
								}}
								className="w-[calc(18.75rem-3.25rem)] sm:w-[calc(22.5rem-3.25rem)]"
								view={item.query}
								label={item.label}
								activeRoute={viewQuery}
								Icon={item.icon}
								onClick={() => setOpen(false)}
							/>
						),
					)}
				</nav>
			</SheetContent>
		</Sheet>
	)
}

