import Link from "next/link"
import Image from "next/image"
import { Trophy, ArrowDown, ArrowUp, Minus } from "@repo/ui/lucide"
import type { BestCreatorDataTypes } from "@/types/best/bestTypes"

interface BestCardProps extends BestCreatorDataTypes {
	name: string
	rank: number
	image: string
	rankChange?: number
	creatorTag?: string
	id: number
}

export function BestCreatorListItem({
	rank,
	name,
	rankChange = 2,
	image = "/placeholder.svg?height=40&width=40",
	creatorTag = "Creator Tag",
	id,
}: BestCardProps) {
	return (
		<Link href={`/profile/${id}`}>
			<div className="ml-5 grid grid-cols-6 items-center border-b border-gray-800 px-4 py-3 transition-colors hover:bg-gray-800/50">
				<div className="flex items-center gap-2">
					<Trophy className="h-5 w-5 text-fuchsia-500" />
					<span className="text-white">{rank}</span>
					{rankChange === 0 ? (
						<Minus color="#8c8c8c" strokeWidth={2.5} size={20} />
					) : (
						<div className="flex items-center text-xs">
							{rankChange > 0 ? (
								<div className="font-xs flex items-center text-green-600">
									<ArrowUp className="h-4 w-4" />
									<span>{Math.abs(rankChange)}</span>
								</div>
							) : (
								<div className="font-xs flex items-center text-red-600">
									<ArrowDown className="h-4 w-4" />
									<span>{Math.abs(rankChange)}</span>
								</div>
							)}
						</div>
					)}
				</div>
				<div className="col-span-2 flex items-center gap-2">
					<Image
						src={image}
						alt={`${name}'s profile`}
						width={32}
						height={32}
						className="rounded-full"
					/>
					<span className="cursor-pointer text-white hover:text-fuchsia-400">
						{name}
					</span>
				</div>
				<div className="col-span-1">
					<span className="rounded-full bg-purple-600/50 px-4 py-1 text-sm font-medium text-white/80">
						{creatorTag}
					</span>
				</div>
				<div className="col-end-7" />
			</div>
		</Link>
	)
}
