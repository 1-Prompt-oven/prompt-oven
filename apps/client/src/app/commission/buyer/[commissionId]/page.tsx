import React, { Suspense } from "react"
import { ThreeDots } from "react-loader-spinner"
import { CommissionDetailTemplate } from "@/components/commission/buyer/detail/template/CommissionDetailTemplate"
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
			<CommissionDetailTemplate commission={commissionData} />
		</Suspense>
	)
}

export default page
