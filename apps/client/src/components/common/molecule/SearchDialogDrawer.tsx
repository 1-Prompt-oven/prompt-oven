import React, { useEffect, useState } from "react"
import debounce from "lodash/debounce"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs"
// import SearchForm from "./SearchForm"
import { X } from "@repo/ui/lucide"
import { Input } from "@repo/ui/input"
import { useRouter } from "next/navigation"
import { useSearchActions } from "@/action/search/useSearchResults"
import SearchItemSkeleton from "../atom/SearchItemSkeleton"

interface SearchDialogDrawerWrapperProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	isOpen: boolean
}

export function SearchDialogDrawer({
	setIsOpen,
	isOpen,
}: SearchDialogDrawerWrapperProps) {
	const [isMobile, setIsMobile] = useState(false)
	const { creators, prompts, fetchAndSetSearchResults } = useSearchActions()
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [currentTab, setCurrentTab] = useState("prompt")

	const debouncedFetchAndSetSearchResults = debounce(
		async (searchQuery: string, tab: string) => {
			try {
				await fetchAndSetSearchResults(searchQuery, tab)
			} finally {
				setIsLoading(false)
			}
		},
		300,
	)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768)
		}
		handleResize()
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value
		if (query === "") {
			return
		}
		debouncedFetchAndSetSearchResults(query, currentTab)
	}

	const handleTabChange = (value: string) => {
		setCurrentTab(value)
	}

	const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const query = (e.target as HTMLInputElement).value.trim()
		if (e.key === "Enter" && query !== "") {
			e.preventDefault()
			router.push(`/prompts?query=${query}`)
			setIsOpen(false)
		}
	}

	return (
		<>
			{isMobile ? (
				<Drawer open={isOpen} onOpenChange={() => setIsOpen(false)}>
					<DrawerContent className="border-zinc-80 min-h-[60%] bg-zinc-900/95 p-5">
						<DrawerTitle className="hidden">Search</DrawerTitle>
						<DrawerDescription className="hidden">
							Search for prompts or creators
						</DrawerDescription>
						<div className="flex justify-between">
							{/* 수빈 - 탭 클릭 시 해당 api 액션 연결 작업 진행하기 */}
							<Tabs
								defaultValue="prompt"
								className="w-full"
								onValueChange={handleTabChange}>
								<TabsList className="mt-[1rem] w-[200px] bg-zinc-800">
									<TabsTrigger value="prompt" className="w-full">
										Prompt
									</TabsTrigger>
									<TabsTrigger value="creator" className="w-full">
										Creator
									</TabsTrigger>
								</TabsList>

								<TabsContent value="creator">
									<div className="mt-4 space-y-3">
										<Input
											onKeyDown={handleEnter}
											onChange={handleInputChange}
											placeholder="What are you searching for?"
											className="placeholder:text-muted-foreground text-muted-foreground border-none bg-transparent text-lg"
										/>
										{isLoading ? (
											<SearchItemSkeleton />
										) : (
											creators.map((creator) => (
												<Button
													key={creator.id}
													variant="ghost"
													className="text-muted-foreground w-full justify-start hover:text-white">
													{creator.nickname}
												</Button>
											))
										)}
									</div>
								</TabsContent>
								<TabsContent value="prompt">
									<div className="mt-4 space-y-3">
										<Input
											onKeyDown={handleEnter}
											onChange={handleInputChange}
											placeholder="What are you searching for?"
											className="placeholder:text-muted-foreground text-muted-foreground border-none bg-transparent text-lg"
										/>
										{isLoading ? (
											<SearchItemSkeleton />
										) : (
											prompts.map((prompt) => (
												<Button
													key={prompt.productUuid}
													variant="ghost"
													className="text-muted-foreground w-full justify-start hover:text-white">
													{prompt.productName}
												</Button>
											))
										)}
									</div>
								</TabsContent>
							</Tabs>
						</div>
					</DrawerContent>
				</Drawer>
			) : (
				<Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
					<DialogContent className="border-zinc-80 bg-zinc-900/95 md:min-w-[55%]">
						<DialogHeader>
							<DialogTitle className="hidden">Search</DialogTitle>
							<DialogDescription className="hidden">
								Search for prompts or creators
							</DialogDescription>
							<div className="flex justify-between">
								<Tabs
									defaultValue="prompt"
									className="w-full"
									onValueChange={handleTabChange}>
									<TabsList className="w-[200px] bg-zinc-800">
										<TabsTrigger value="prompt" className="w-full">
											Prompt
										</TabsTrigger>
										<TabsTrigger value="creator" className="w-full">
											Creator
										</TabsTrigger>
									</TabsList>
									<TabsContent value="creator">
										<div className="mt-4 space-y-3">
											<Input
												onKeyDown={handleEnter}
												onChange={handleInputChange}
												placeholder="What are you searching for?"
												className="placeholder:text-muted-foreground text-muted-foreground border-none bg-transparent text-lg"
											/>
											{isLoading ? (
												<SearchItemSkeleton />
											) : (
												creators.map((creator) => (
													<Button
														key={creator.id}
														variant="ghost"
														className="text-muted-foreground w-full justify-start hover:text-white">
														{creator.nickname}
													</Button>
												))
											)}
										</div>
									</TabsContent>
									<TabsContent value="prompt">
										<div className="mt-4 space-y-3">
											<Input
												onKeyDown={handleEnter}
												onChange={handleInputChange}
												placeholder="What are you searching for?"
												className="placeholder:text-muted-foreground text-muted-foreground border-none bg-transparent text-lg"
											/>
											{isLoading ? (
												<SearchItemSkeleton />
											) : (
												prompts.map((prompt) => (
													<Button
														key={prompt.productUuid}
														variant="ghost"
														className="text-muted-foreground w-full justify-start hover:text-white">
														{prompt.productName}
													</Button>
												))
											)}
										</div>
									</TabsContent>
								</Tabs>
								<Button
									variant="ghost"
									className="text-muted-foreground mt-1.5 h-6 w-6 p-0"
									onClick={() => setIsOpen(false)}>
									<X className="!h-6 !w-6" />
									<span className="sr-only">Close</span>
								</Button>
							</div>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			)}
		</>
	)
}

