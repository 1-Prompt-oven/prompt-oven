import React, { Suspense } from "react"
import { ThreeDots } from "react-loader-spinner"
import SellerCommissionDetailTemplate from "@/components/commission/seller/detail/template/SellerCommissionDetailTemplate"
import { getCommissionDetail } from "@/action/commission/commissionAction"

interface CommissionDetailPageProps {
	params: { commissionId: string }
}

async function page({ params: { commissionId } }: CommissionDetailPageProps) {
	const { result: commissionData } = await getCommissionDetail(commissionId)

	return (
		<Suspense
			fallback={
				<div className="mb-8 flex flex-col items-center justify-center">
					<ThreeDots
						visible
						height="80"
						width="80"
						color="#A913F9"
						radius="9"
						ariaLabel="three-dots-loading"
						wrapperStyle={{}}
						wrapperClass=""
					/>
					<span className="text-xl font-medium leading-[150%] text-white">
						Loading...
					</span>
				</div>
			}>
			<SellerCommissionDetailTemplate commission={commissionData} />
		</Suspense>
	)
}

export default page

// 판매자가 커미션 세부 내용 확인
// 상태에 따라 UI 변경 -> requested 일 때는 수락/거절 버튼, in_progress 일 때는 결과물 제출 버튼
// 결과물 제출 및 상태 업데이트
