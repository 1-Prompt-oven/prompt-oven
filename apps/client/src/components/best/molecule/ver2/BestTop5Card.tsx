"use client"
import React from "react"
import Link from "next/link"
import {
	ArrowDown,
	ArrowUp,
	Minus,
	Users,
	Star,
	TrendingUp,
	Calendar,
	Eye,
	DollarSign,
} from "@repo/ui/lucide"
import { Card } from "@repo/ui/card"
import { Badge } from "@repo/ui/badge"
import Image from "next/image"

interface BestCardProps {
	memberUUID: string // 베스트
	ranking: number // 베스트
	rankingChange: number // 베스트
	dailySellsCount: number // 베스트
	avgStar: number // 베스트
	date: string // 베스트
	avatarImage: string | undefined // 프로필
	nickname: string // 프로필
	follower: number // 프로필
	hashTag: string | undefined // 프로필
	totalSales: number
	views: number
}

export default function BestTop5Card({
	memberUUID,
	ranking,
	rankingChange,
	dailySellsCount,
	avgStar,
	date,
	avatarImage = "https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/TestAvartar.png",
	nickname,
	follower,
	hashTag,
	totalSales,
	views,
}: BestCardProps) {
	const calculateDaysSinceJoined = (joinedDate: string) => {
		const [year, month, day] = joinedDate.split("-").map(Number)
		const joinDate = new Date(year, month - 1, day) // month is 0-indexed in Date constructor
		const today = new Date()
		const diffTime = Math.abs(today.getTime() - joinDate.getTime())
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
		return diffDays
	}

	const daysSinceJoined = calculateDaysSinceJoined(date)

	return (
		<Link href={`/profile/${memberUUID}`}>
			<Card className="relative w-auto overflow-hidden bg-gradient-to-br from-purple-600 to-purple-700 p-4 text-white">
				{/* Ranking */}
				<div className="absolute left-3 top-3 flex items-center gap-2">
					<Badge variant="secondary" className="px-3 py-1 text-lg font-bold">
						#{ranking}
					</Badge>
					{rankingChange === 0 ? (
						<Badge
							variant="secondary"
							className="flex items-center gap-1 px-2 py-1">
							<Minus color="#8c8c8c" strokeWidth={2.5} size={20} />
						</Badge>
					) : (
						<Badge
							variant="secondary"
							className="flex items-center gap-1 px-2 py-1">
							{rankingChange > 0 ? (
								<div className="font-xs flex items-center text-green-600">
									<ArrowUp className="h-4 w-4" />
									<span>{Math.abs(rankingChange)}</span>
								</div>
							) : (
								<div className="font-xs flex items-center text-red-600">
									<ArrowDown className="h-4 w-4" />
									<span>{Math.abs(rankingChange)}</span>
								</div>
							)}
						</Badge>
					)}
				</div>

				{/* Avatar Section */}
				<div className="pb-4 pt-12">
					<div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
						<Image
							src={avatarImage}
							alt={nickname}
							className="h-full w-full object-cover"
							width={100}
							height={100}
						/>
					</div>

					{/* Creator Info */}
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<h3 className="text-xl font-bold">{nickname}</h3>
							{hashTag && (
								<Badge
									variant="outline"
									className="flex items-center border-purple-400 text-white">
									{hashTag}
								</Badge>
							)}
						</div>

						{/* Stats Grid */}
						<div className="grid grid-cols-2 gap-2 text-sm">
							<div className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
								<div className="flex items-center gap-1">
									<TrendingUp className="h-4 w-4" />
									<span>Daily Sales</span>
								</div>
								<span className="font-semibold">{dailySellsCount}</span>
							</div>
							<div className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
								<div className="flex items-center gap-1">
									<Users className="h-4 w-4" />
									<span>Followers</span>
								</div>
								<span className="font-semibold">
									{(follower / 1000).toFixed(1)}k
								</span>
							</div>
							<div className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
								<div className="flex items-center gap-1">
									<Star className="h-4 w-4 text-yellow-400" />
									<span>Rating</span>
								</div>
								<span className="font-semibold">{avgStar.toFixed(1)}</span>
							</div>
							<div className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
								<div className="flex items-center gap-1">
									<Eye className="h-4 w-4" />
									<span>Views</span>
								</div>
								<span className="font-semibold">{views.toLocaleString()}</span>
							</div>
						</div>

						{/* Additional Info */}
						<div className="flex items-center justify-between text-sm text-white/80">
							<div className="flex items-center gap-1">
								<Calendar className="h-4 w-4" />
								<span>Joined {daysSinceJoined} days ago</span>
							</div>
						</div>

						{/* Total Sales */}
						<div className="mt-2 flex items-center justify-between rounded-full bg-white/20 px-4 py-2">
							<div className="flex items-center gap-2">
								<DollarSign className="h-4 w-4 text-yellow-400" />
								<span>Total Sales</span>
							</div>
							<span className="font-bold">{totalSales.toLocaleString()}</span>
						</div>
					</div>
				</div>
			</Card>
		</Link>
	)
}
