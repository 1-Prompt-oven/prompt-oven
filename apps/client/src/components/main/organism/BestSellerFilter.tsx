import React from "react"
import BestSeller from "@/components/main/molecule/BestSeller.tsx"
import type { RenderedRankingItemTypes } from "@/types/best/bestTypes.ts"

interface BestSellerFilterProps {
	sellers: RenderedRankingItemTypes[]
}
// todo - API 적용 시에 selector의 변경에 따라 다른 데이터를 보여주도록 수정, 현재는 더미 데이터로 구현
function BestSellerFilter({ sellers }: BestSellerFilterProps) {
	return (
		<div className="mx-auto w-full max-w-[1420px] px-2 sm:!px-4">
			<div className="mb-4 flex flex-row items-center justify-between gap-2 sm:!mb-8 sm:!gap-4">
				<h2 className="flex items-center gap-2 text-[22px] font-semibold text-white sm:!text-[28px] md:!text-[32px] lg:!text-[38px]">
					Best sellers
				</h2>
				{/*<BestSellerSelector />*/}
			</div>

			<div className="grid grid-cols-1 gap-3 xs:grid-cols-2 xs:gap-[20px] md:!grid-cols-3 lg:!grid-cols-4 xl:!grid-cols-5">
				{sellers.map((seller, index) => (
					<BestSeller
						key={seller.memberUuid}
						number={index + 1}
						sellerImage={seller.avatarImage}
						nickname={seller.nickname}
						earnings={seller.totalSales}
						isVerified={seller.reviewAvg > 4}
					/>
				))}
			</div>
		</div>
	)
}

export default BestSellerFilter
