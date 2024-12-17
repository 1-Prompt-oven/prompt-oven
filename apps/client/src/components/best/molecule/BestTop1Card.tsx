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
	// Calendar,
	// Eye,
	// DollarSign,
} from "@repo/ui/lucide"
import { Card } from "@repo/ui/card"
import { Badge } from "@repo/ui/badge"
import Image from "next/image"

interface BestCardProps {
	ranking: number // 베스트
	rankingChange: number // 베스트
	reviewAvg: number // 베스트
	avatarImage: string | undefined // 프로필
	nickname: string // 프로필
	follower: number // 프로필
	hashTag: string | undefined // 프로필
	views: number
	isTopRanked?: boolean
	totalSales: number
}

export default function BestTop1Card({
	ranking,
	rankingChange,
	reviewAvg,
	avatarImage = "https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/TestAvartar.png",
	nickname,
	follower,
	hashTag,
	isTopRanked = false,
	totalSales,
	// views,
}: BestCardProps) {
	// const calculateDaysSinceJoined = (joinedDate: string) => {
	// 	const [year, month, day] = joinedDate.split("-").map(Number)
	// 	const joinDate = new Date(year, month - 1, day) // month is 0-indexed in Date constructor
	// 	const today = new Date()
	// 	const diffTime = Math.abs(today.getTime() - joinDate.getTime())
	// 	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
	// 	return diffDays
	// }

	// const daysSinceJoined = calculateDaysSinceJoined(date)

	return (
		<Link href={`/profile/seller/${nickname}`}>
			<Card
				className={`group relative w-auto overflow-hidden bg-black p-6 text-white transition-all hover:scale-[1.02] ${
					isTopRanked ? "p-6" : "p-4"
				} `}>
				{/* Decorative Elements */}
				<div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent" />
				<div className="bg-purple-500/10 absolute -left-32 -top-32 h-64 w-64 rounded-full blur-3xl" />
				<div className="bg-purple-500/10 absolute -bottom-32 -right-32 h-64 w-64 rounded-full blur-3xl" />

				{/* Content Container */}
				<div className="relative">
					{/* Ranking Badge */}
					<div className="mb-8 flex items-center gap-2">
						<Badge
							variant="outline"
							className="border-purple-500/50 px-3 py-1.5 text-lg font-bold text-purple-300">
							#{ranking}
						</Badge>
						{rankingChange === 0 ? (
							<Badge variant="outline" className="border-zinc-700 px-2 py-1.5">
								<Minus className="h-4 w-4 text-zinc-500" />
							</Badge>
						) : (
							<Badge
								variant="outline"
								className="border-zinc-700/50 px-2 py-1.5">
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
					<div className="grid gap-6 sm:grid-cols-[140px,1fr]">
						{/* Avatar */}
						<div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black">
							<Image
								src={
									avatarImage ||
									"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/TestAvartar.png"
								}
								alt={nickname}
								className="h-full w-full object-cover transition-all group-hover:scale-105"
								width={140}
								height={140}
								unoptimized
							/>
						</div>

						{/* Info Section */}
						<div className="flex flex-col gap-4">
							{/* Name and Tag */}
							<div className="flex flex-col items-start gap-2">
								<h3 className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-2xl font-bold text-transparent">
									{nickname}
								</h3>
								{hashTag ? (
									<Badge
										variant="outline"
										className="border-purple-500/50 text-purple-300">
										{hashTag}
									</Badge>
								) : null}

								{/* Stats Grid */}
								<div className="grid grid-cols-3 gap-2">
									{[
										{
											icon: TrendingUp,
											label: "Sales",
											value: totalSales,
										},
										{
											icon: Users,
											label: "Followers",
											value: `${(follower / 1000).toFixed(1)}k`,
										},
										{
											icon: Star,
											label: "Rating",
											value: reviewAvg.toFixed(1),
											highlight: true,
										},
										// {
										// 	icon: Eye,
										// 	label: "Views",
										// 	value: views.toLocaleString(),
										// },
									].map((stat) => (
										<div
											key={stat.label}
											className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-white/5 px-3 py-2 backdrop-blur-sm">
											<div className="flex items-center gap-2">
												<stat.icon
													className={`h-4 w-4 ${stat.highlight ? "text-yellow-400" : "text-purple-300"}`}
												/>
												<span className="text-sm text-zinc-400">
													{stat.label}
												</span>
											</div>
											<span className="font-medium">{stat.value}</span>
										</div>
									))}
								</div>
							</div>

							{/* Footer Stats */}
							<div className="space-y-3 pt-4">
								{/* <div className="flex items-center gap-2 text-sm text-zinc-400">
									<Calendar className="h-4 w-4" />
									<span>Joined {daysSinceJoined} days ago</span>
								</div> */}

								{/* <div className="bg-purple-500/10 flex items-center justify-between rounded-full border border-purple-500/20 px-4 py-2.5 backdrop-blur-sm">
									<div className="flex items-center gap-2">
										<DollarSign className="h-5 w-5 text-purple-300" />
										<span className="font-medium text-purple-100">
											Total Sales
										</span>
									</div>
									<span className="font-bold text-white">
										{totalSales.toLocaleString()}
									</span>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</Card>
		</Link>
	)
}

