import Link from "next/link"
import Image from "next/image"
import {
	Trophy,
	ArrowDown,
	ArrowUp,
	Minus,
	Star,
	Users,
	TrendingUp,
} from "@repo/ui/lucide"

interface BestCardProps {
	ranking: number // 베스트
	rankingChange: number // 베스트
	reviewAvg: number // 베스트
	_date: string // 베스트
	avatarImage: string | undefined // 프로필
	nickname: string // 프로필
	follower: number // 프로필
	hashTag: string | undefined // 프로필
	totalSales: number
	_views: number
}

export function BestCreatorListItem({
	ranking,
	rankingChange,
	reviewAvg,
	_date,
	avatarImage = "https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/TestAvartar.png",
	nickname,
	follower,
	hashTag,
	totalSales,
	_views,
}: BestCardProps) {
	return (
		<Link href={`/profile/seller/${nickname}`}>
			<div className="grid items-center border-b border-gray-800 py-3 transition-colors hover:bg-gray-800/50 xxs:grid-cols-10 xxs:px-5 xxs:text-xs sm:grid-cols-12 sm:px-6 sm:text-base">
				<div className="col-span-2 flex items-center gap-2 sm:col-span-1">
					<Trophy className="text-fuchsia-500 xxs:h-4 xxs:w-4 sm:h-5 sm:w-5" />
					<span className="font-bold text-white">{ranking}</span>
					{rankingChange === 0 ? (
						<Minus color="#8c8c8c" strokeWidth={2.5} size={20} />
					) : (
						<div className="flex items-center text-xs">
							{rankingChange > 0 ? (
								<div className="flex items-center text-green-600">
									<ArrowUp className="xxs:h-3 xxs:w-3 sm:h-4 sm:w-4" />
									<span>{Math.abs(rankingChange)}</span>
								</div>
							) : (
								<div className="flex items-center text-red-600">
									<ArrowDown className="xxs:h-3 xxs:w-3 sm:h-4 sm:w-4" />
									<span>{Math.abs(rankingChange)}</span>
								</div>
							)}
						</div>
					)}
				</div>
				<div className="flex items-center xxs:col-span-1 xxs:flex-col xxs:gap-2 sm:col-span-3 sm:flex-row sm:justify-center sm:gap-3">
					<Image
						src={
							avatarImage ||
							"https://promptoven.s3.ap-northeast-2.amazonaws.com/dummy/profile/TestAvartar.png"
						}
						alt={`${nickname}'s profile`}
						width={32}
						height={32}
						className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
						unoptimized
					/>
					<span className="inline-block cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-white hover:text-fuchsia-400 xxs:text-[11px] sm:text-base">
						{nickname}
					</span>
				</div>
				<div className="col-span-1 xxs:block sm:hidden" />
				<div className="inline-block overflow-hidden text-ellipsis whitespace-nowrap text-center xxs:col-span-2 sm:col-span-3">
					{hashTag ? (
						<span className="rounded-full bg-purple-600/50 px-3 py-1 text-center font-medium text-white/80 xxs:w-[80px] xxs:text-[10px] sm:w-[100px] sm:text-sm md:w-[120px] md:text-sm lg:w-[150px] lg:text-base">
							{hashTag}
						</span>
					) : null}
				</div>
				<div className="col-span-1 hidden sm:block" />
				<div className="flex items-center justify-center gap-1 text-white/80 xxs:col-span-3 sm:col-span-2 sm:block">
					<TrendingUp className="h-4 w-4" />
					<span>{totalSales}</span>
				</div>
				<div className="flex items-center gap-1 text-white/80 xxs:col-span-1 xxs:justify-end sm:col-span-1 sm:justify-center">
					<Star className="h-4 w-4 text-yellow-400" />
					<span>{reviewAvg.toFixed(1)}</span>
				</div>
				<div className="col-span-2 flex items-center justify-start gap-1 text-white/80 xxs:hidden sm:mr-4 sm:block sm:justify-end">
					<Users className="h-4 w-4 xxs:hidden sm:block" />
					<span className="xxs:hidden sm:block">
						{(follower / 1000).toFixed(1)}k
					</span>
				</div>
			</div>
		</Link>
	)
}

