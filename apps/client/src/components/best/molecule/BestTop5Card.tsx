"use client"
import React from "react"
import Link from "next/link"
import { ArrowDown, ArrowUp, Minus } from "@repo/ui/lucide"
import { Card } from "@repo/ui/card"
import Image from "next/image"
import type { BestCreatorDataTypes } from "@/types/best/bestTypes"

interface BestCardProps extends BestCreatorDataTypes {
	name: string
	rank: number
	image: string
	rankChange?: number
	creatorTag?: string
	id: number
}

export default function BestTop5Card({
	name = "Creator Name",
	rank = 1,
	rankChange = 2,
	creatorTag = "Creator Tag",
	id,
}: BestCardProps) {
	return (
		<Link href={`/profile/${id}`}>
			<Card className="relative h-auto w-[17.5rem] border-none bg-gradient-to-br from-purple-700 to-fuchsia-900 py-6 pt-4 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
				<div className="mb-3 flex items-center justify-between gap-2 px-5">
					<div className="flex items-center gap-2 rounded-full bg-purple-600/50 px-4 py-1 text-sm font-medium">
						<span className="text-base font-semibold">#{rank}</span>
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
					<div className="col-end-7 mr-[-0.525rem] flex items-center justify-end" />
				</div>

				<div className="flex h-full flex-col items-center justify-center gap-4 p-6 pt-0">
					<div className="h-auto w-auto overflow-hidden border-2 border-white/20">
						<Image
							src="/img/main/art1.png"
							alt="Profile picture"
							width={120}
							height={80}
							className="object-cover"
						/>
					</div>

					<div className="flex flex-col gap-2 text-center">
						<h2 className="text-2xl font-bold">{name}</h2>
						<span className="rounded-full bg-purple-600/50 px-4 py-1 text-sm font-medium text-white/80">
							{creatorTag}
						</span>
					</div>
				</div>
			</Card>
		</Link>
	)
}
