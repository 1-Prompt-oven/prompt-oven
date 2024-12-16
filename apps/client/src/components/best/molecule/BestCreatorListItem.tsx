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
			<div className="grid grid-cols-12 items-center border-b border-gray-800 px-4 py-3 pl-3 transition-colors hover:bg-gray-800/50 xxs:text-xs sm:text-base">
				<div className="col-span-2 ml-2 flex items-center gap-2">
					<Trophy className="h-5 w-5 text-fuchsia-500" />
					<span className="font-bold text-white">{ranking}</span>
					{rankingChange === 0 ? (
						<Minus color="#8c8c8c" strokeWidth={2.5} size={20} />
					) : (
						<div className="flex items-center text-xs">
							{rankingChange > 0 ? (
								<div className="flex items-center text-green-600">
									<ArrowUp className="h-4 w-4" />
									<span>{Math.abs(rankingChange)}</span>
								</div>
							) : (
								<div className="flex items-center text-red-600">
									<ArrowDown className="h-4 w-4" />
									<span>{Math.abs(rankingChange)}</span>
								</div>
							)}
						</div>
					)}
				</div>
				<div className="flex items-center gap-3 xxs:col-span-2 xxs:flex-col xxs:justify-start sm:col-span-3 sm:ml-7 sm:flex-row sm:justify-center">
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
					<span className="cursor-pointer text-white hover:text-fuchsia-400">
						{nickname}
					</span>
				</div>
				<div className="flex items-center justify-center text-center xxs:col-span-3 sm:col-span-1 sm:ml-4 sm:mr-7">
					{hashTag ? (
						<span className="rounded-full bg-purple-600/50 px-3 py-1 text-center font-medium text-white/80 xxs:text-xs sm:text-base">
							{hashTag}
						</span>
					) : null}
				</div>
				<div className="col-span-1" />
				<div className="col-span-2 flex hidden items-center justify-center gap-1 text-white/80 sm:col-span-1 sm:block">
					<TrendingUp className="h-4 w-4" />
					<span>{totalSales}</span>
				</div>
				<div className="col-span-2 mr-6 flex hidden items-center gap-1 text-white/80 xxs:justify-start sm:block sm:justify-end">
					<Star className="h-4 w-4 text-yellow-400" />
					<span>{reviewAvg.toFixed(1)}</span>
				</div>
				<div className="!sm:hidden col-span-2 block flex flex-col items-start justify-center gap-1">
					<div className="flex items-center justify-center gap-1 text-white/80 sm:col-span-1">
						<TrendingUp className="h-4 w-4" />
						<span>{totalSales}</span>
					</div>
					<div className="flex items-center gap-1 text-white/80">
						<Star className="h-4 w-4 text-yellow-400" />
						<span>{reviewAvg.toFixed(1)}</span>
					</div>
				</div>
				<div className="sm-block col-span-2 flex hidden items-center justify-start gap-1 text-white/80 sm:mr-6 sm:justify-end">
					<Users className="h-4 w-4" />
					<span>{(follower / 1000).toFixed(1)}k</span>
				</div>
				{/* <div className="col-span-1 flex items-center gap-1 text-right text-white/80">
					<DollarSign className="h-4 w-4 text-yellow-400" />
					{totalSales.toLocaleString()}
				</div> */}
			</div>
		</Link>
	)
}

