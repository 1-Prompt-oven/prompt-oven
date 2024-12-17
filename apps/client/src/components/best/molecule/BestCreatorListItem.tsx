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
			<div className="grid items-center border-b border-gray-800 px-5 py-3 text-xs transition-colors hover:bg-gray-800/50 max-xxs:grid-cols-10 sm:grid-cols-12 sm:px-6 sm:text-base">
				<div className="flex items-center gap-2 max-xxs:col-span-2 sm:col-span-1">
					<Trophy className="h-4 w-4 text-fuchsia-500 sm:h-5 sm:w-5" />
					<span className="font-bold text-white">{ranking}</span>
					{rankingChange === 0 ? (
						<Minus color="#8c8c8c" strokeWidth={2.5} size={20} />
					) : (
						<div className="flex items-center">
							{rankingChange > 0 ? (
								<div className="flex items-center text-green-600">
									<ArrowUp className="h-3 w-3 sm:h-4 sm:w-4" />
									<span className="text-xs">{Math.abs(rankingChange)}</span>
								</div>
							) : (
								<div className="flex items-center text-red-600">
									<ArrowDown className="h-3 w-3 sm:h-4 sm:w-4" />
									<span className="text-xs">{Math.abs(rankingChange)}</span>
								</div>
							)}
						</div>
					)}
				</div>
				<div className="col-span-1 flex flex-col items-center gap-2 sm:col-span-3 sm:flex-row sm:justify-center sm:gap-3">
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
					<span className="inline-block cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-white hover:text-fuchsia-400 sm:text-base">
						{nickname}
					</span>
				</div>
				<div className="col-span-1 max-xxs:block sm:hidden" />
				<div className="col-span-2 inline-block overflow-hidden text-ellipsis whitespace-nowrap text-center sm:col-span-3">
					{hashTag ? (
						<span className="w-[80px] rounded-full bg-purple-600/50 px-3 py-1 text-center text-[10px] font-medium text-white/80 sm:w-[100px] sm:text-sm md:w-[120px] md:text-sm lg:w-[150px] lg:text-base">
							{hashTag}
						</span>
					) : null}
				</div>
				{/* <div className="col-span-1 max-xxs:hidden sm:block" /> */}
				<div className="flex items-center justify-center gap-1 text-white/80 max-xxs:col-span-3 sm:col-span-2 sm:block">
					<TrendingUp className="h-4 w-4" />
					<span>{totalSales}</span>
				</div>
				<div className="flex items-center justify-end gap-1 text-white/80 max-xxs:col-span-1 sm:col-span-1 sm:justify-center">
					<Star className="h-4 w-4 text-yellow-400" />
					<span>{reviewAvg.toFixed(1)}</span>
				</div>
				<div className="col-span-2 flex items-center justify-start gap-1 text-white/80 max-xxs:hidden sm:mr-4 sm:block sm:justify-end">
					<Users className="h-4 w-4 max-xxs:hidden sm:block" />
					<span className="max-xxs:hidden sm:block">
						{(follower / 1000).toFixed(1)}k
					</span>
				</div>
			</div>
		</Link>
	)
}

