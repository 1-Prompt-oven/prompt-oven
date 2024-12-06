// import React, { useEffect, useState } from "react"
// import debounce from "lodash/debounce"
// import { Button } from "@repo/ui/button"
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogDescription,
// 	DialogHeader,
// 	DialogTitle,
// 	// DialogTrigger,
// } from "@repo/ui/dialog"
// import {
// 	Drawer,
// 	// DrawerClose,
// 	DrawerContent,
// 	DrawerDescription,
// 	// DrawerFooter,
// 	// DrawerHeader,
// 	DrawerTitle,
// 	// DrawerTrigger,
// } from "@repo/ui/drawer"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs"
// // import SearchForm from "./SearchForm"
// import { X } from "@repo/ui/lucide"
// import { Input } from "@repo/ui/input"
// import { useRouter } from "next/navigation"
// import { useSearchActions } from "@/action/search/useSearchResults"
// import SearchItemSkeleton from "../atom/SearchItemSkeleton"

// interface SearchDialogDrawerWrapperProps {
// 	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
// 	isOpen: boolean
// }

// export function SearchDialogDrawerBackup({
// 	setIsOpen,
// 	isOpen,
// }: SearchDialogDrawerWrapperProps) {
// 	const [isMobile, setIsMobile] = useState(false)
// 	const {
// 		creators,
// 		prompts,
// 		setCreators,
// 		setPrompts,
// 		fetchAndSetSearchResults,
// 	} = useSearchActions()
// 	const router = useRouter()
// 	const [query, setQuery] = useState("")
// 	const [isLoading, setIsLoading] = useState(false)
// 	const [currentTab, setCurrentTab] = useState("prompt")

// 	const debouncedFetchAndSetSearchResults = debounce(
// 		async (searchQuery: string, tab: string) => {
// 			try {
// 				setIsLoading(true)
// 				await fetchAndSetSearchResults(searchQuery, tab)
// 			} finally {
// 				setIsLoading(false)
// 			}
// 		},
// 		300,
// 	)

// 	useEffect(() => {
// 		const handleResize = () => {
// 			setIsMobile(window.innerWidth < 768)
// 		}
// 		handleResize()
// 		window.addEventListener("resize", handleResize)
// 		return () => window.removeEventListener("resize", handleResize)
// 	}, [])

// 	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const newQuery = e.target.value
// 		setQuery(newQuery)
// 		if (newQuery === "") {
// 			setPrompts([])
// 			setCreators([])
// 			return
// 		}
// 		debouncedFetchAndSetSearchResults(newQuery, currentTab)
// 	}

// 	const handleTabChange = (value: string) => {
// 		setCurrentTab(value)
// 		setQuery("")
// 		setPrompts([])
// 		setCreators([])
// 	}

// 	const renderTabContent = () => {
// 		if (isLoading) {
// 			return <SearchItemSkeleton />
// 		}

// 		if (query && currentTab === "prompt" && prompts.length === 0) {
// 			return <p className="text-muted-foreground">No prompts found.</p>
// 		}

// 		if (query && currentTab === "creator" && creators.length === 0) {
// 			return <p className="text-muted-foreground">No creators found.</p>
// 		}

// 		return currentTab === "prompt"
// 			? prompts.map((prompt) => (
// 					<Button
// 						key={prompt.productUuid}
// 						variant="ghost"
// 						className="text-muted-foreground w-full justify-start hover:text-white">
// 						{prompt.productName}
// 					</Button>
// 				))
// 			: creators.map((creator) => (
// 					<Button
// 						key={creator.id}
// 						variant="ghost"
// 						className="text-muted-foreground w-full justify-start hover:text-white">
// 						{creator.nickname}
// 					</Button>
// 				))
// 	}

// 	const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
// 		if (e.key === "Enter" && query.trim() !== "") {
// 			e.preventDefault()
// 			router.push(`/prompts?query=${query}`)
// 			closeDialog()
// 		}
// 	}

// 	const closeDialog = () => {
// 		setPrompts([])
// 		setCreators([])
// 		setQuery("")
// 		setIsLoading(false)
// 		setIsOpen(false)
// 	}

// 	return (
// 		<>
// 			{isMobile ? (
// 				<Drawer open={isOpen} onOpenChange={closeDialog}>
// 					<DrawerContent className="border-zinc-80 min-h-[60%] bg-zinc-900/95 p-5">
// 						<DrawerTitle className="hidden">Search</DrawerTitle>
// 						<DrawerDescription className="hidden">
// 							Search for prompts or creators
// 						</DrawerDescription>
// 						<div className="flex justify-between">
// 							<Tabs
// 								defaultValue="prompt"
// 								className="w-full"
// 								onValueChange={handleTabChange}>
// 								<TabsList className="mt-[1rem] w-[200px] bg-zinc-800">
// 									<TabsTrigger value="prompt" className="w-full">
// 										Prompt
// 									</TabsTrigger>
// 									<TabsTrigger value="creator" className="w-full">
// 										Creator
// 									</TabsTrigger>
// 								</TabsList>

// 								<TabsContent value="creator">
// 									<div className="mt-4 space-y-3">
// 										<Input
// 											onKeyDown={handleEnter}
// 											onChange={handleInputChange}
// 											value={query}
// 											placeholder="What are you searching for?"
// 											className="placeholder:text-muted-foreground text-muted-foreground border-none bg-transparent text-lg"
// 										/>
// 										<div className="max-h-[40vh] overflow-y-auto">
// 											{renderTabContent()}
// 										</div>
// 									</div>
// 								</TabsContent>
// 								<TabsContent value="prompt">
// 									<div className="mt-4 space-y-3">
// 										<Input
// 											onKeyDown={handleEnter}
// 											onChange={handleInputChange}
// 											value={query}
// 											placeholder="What are you searching for?"
// 											className="placeholder:text-muted-foreground text-muted-foreground border-none bg-transparent text-lg"
// 										/>
// 										<div className="max-h-[40vh] overflow-y-auto">
// 											<div className="max-h-[40vh] overflow-y-auto">
// 												{renderTabContent()}
// 											</div>
// 										</div>
// 									</div>
// 								</TabsContent>
// 							</Tabs>
// 						</div>
// 					</DrawerContent>
// 				</Drawer>
// 			) : (
// 				<Dialog open={isOpen} onOpenChange={closeDialog}>
// 					<DialogContent className="border-zinc-80 fixed left-1/2 top-[50%] max-h-[70vh] overflow-scroll bg-zinc-900/95 md:min-w-[55%]">
// 						<DialogHeader>
// 							<DialogTitle className="hidden">Search</DialogTitle>
// 							<DialogDescription className="hidden">
// 								Search for prompts or creators
// 							</DialogDescription>
// 							<div className="flex justify-between">
// 								<Tabs
// 									defaultValue="prompt"
// 									className="w-full"
// 									onValueChange={handleTabChange}>
// 									<TabsList className="w-[200px] bg-zinc-800">
// 										<TabsTrigger value="prompt" className="w-full">
// 											Prompt
// 										</TabsTrigger>
// 										<TabsTrigger value="creator" className="w-full">
// 											Creator
// 										</TabsTrigger>
// 									</TabsList>
// 									<TabsContent value="creator">
// 										<div className="mt-4 space-y-3">
// 											<Input
// 												onKeyDown={handleEnter}
// 												onChange={handleInputChange}
// 												value={query}
// 												placeholder="What are you searching for?"
// 												className="placeholder:text-muted-foreground text-muted-foreground border-none bg-transparent text-lg"
// 											/>
// 											<div className="max-h-[40vh] overflow-y-auto">
// 												<div className="max-h-[40vh] overflow-y-auto">
// 													{renderTabContent()}
// 												</div>
// 											</div>
// 										</div>
// 									</TabsContent>
// 									<TabsContent value="prompt">
// 										<div className="mt-4 space-y-3">
// 											<Input
// 												onKeyDown={handleEnter}
// 												onChange={handleInputChange}
// 												value={query}
// 												placeholder="What are you searching for?"
// 												className="placeholder:text-muted-foreground text-muted-foreground border-none bg-transparent text-lg"
// 											/>
// 											<div className="max-h-[40vh] overflow-y-auto">
// 												{renderTabContent()}
// 											</div>
// 										</div>
// 									</TabsContent>
// 								</Tabs>
// 								<Button
// 									variant="ghost"
// 									className="text-muted-foreground mt-1.5 h-6 w-6 p-0"
// 									onClick={closeDialog}>
// 									<X className="!h-6 !w-6" />
// 									<span className="sr-only">Close</span>
// 								</Button>
// 							</div>
// 						</DialogHeader>
// 					</DialogContent>
// 				</Dialog>
// 			)}
// 		</>
// 	)
// }
