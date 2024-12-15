"use client"

import {
	ArrowDown,
	ArrowUp,
	Minus,
	Star,
	TrendingUp,
	Users,
} from "@repo/ui/lucide"
import { Card } from "@repo/ui/card"
import { Badge } from "@repo/ui/badge"
import Image from "next/image"
import Link from "next/link"

interface BestTop4CardProps {
	ranking: number
	rankingChange: number
	dailySellsCount: number
	reviewAvg: number
	avatarImage?: string
	nickname: string
	follower: number
	hashTag?: string
}

export default function BestTop4Card({
	ranking,
	rankingChange,
	dailySellsCount,
	reviewAvg,
	avatarImage = "https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/TestAvartar.png",
	nickname,
	follower,
	hashTag,
}: BestTop4CardProps) {
	return (
		<Link href={`/profile/seller/${nickname}`}>
			<Card className="group relative overflow-hidden bg-black p-4 text-white transition-all hover:scale-[1.02]">
				{/* Subtle gradient background */}
				<div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent" />

				<div className="relative space-y-4">
					{/* Header with Rank and Change */}
					<div className="flex items-center justify-between">
						<Badge
							variant="outline"
							className="border-purple-500/50 px-2 py-1 text-base font-bold text-purple-300">
							#{ranking}
						</Badge>
						{rankingChange === 0 ? (
							<Badge variant="outline" className="border-zinc-700 px-2 py-1">
								<Minus className="h-4 w-4 text-zinc-500" />
							</Badge>
						) : (
							<Badge variant="outline" className="border-zinc-700/50 px-2 py-1">
								{rankingChange > 0 ? (
									<div className="flex items-center gap-1 text-emerald-400">
										<ArrowUp className="h-4 w-4" />
										<span className="text-sm">{Math.abs(rankingChange)}</span>
									</div>
								) : (
									<div className="flex items-center gap-1 text-red-400">
										<ArrowDown className="h-4 w-4" />
										<span className="text-sm">{Math.abs(rankingChange)}</span>
									</div>
								)}
							</Badge>
						)}
					</div>

					{/* Profile Section */}
					<div className="flex items-start gap-3">
						<div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-white/10">
							<Image
								src={avatarImage}
								alt={nickname}
								className="h-full w-full object-cover transition-all group-hover:scale-105"
								width={64}
								height={64}
								unoptimized
							/>
						</div>

						<div className="flex-1 space-y-2">
							<div className="flex flex-col gap-1">
								<h3 className="truncate text-lg font-bold text-white">
									{nickname}
								</h3>
								{hashTag ? (
									<Badge
										variant="outline"
										className="w-fit border-purple-500/50 text-xs text-purple-300">
										{hashTag}
									</Badge>
								) : null}
							</div>
						</div>
					</div>

					{/* Stats Grid */}
					<div className="grid grid-cols-3 gap-2">
						<div className="flex items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/5 px-2 py-1.5">
							<TrendingUp className="h-3.5 w-3.5 text-purple-300" />
							<span className="text-sm">{dailySellsCount}</span>
						</div>
						<div className="flex items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/5 px-2 py-1.5">
							<Star className="h-3.5 w-3.5 text-yellow-400" />
							<span className="text-sm">{reviewAvg.toFixed(1)}</span>
						</div>
						<div className="flex items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/5 px-2 py-1.5">
							<Users className="h-3.5 w-3.5 text-purple-300" />
							<span className="text-sm">{(follower / 1000).toFixed(1)}k</span>
						</div>
					</div>
				</div>
			</Card>
		</Link>
	)
}
