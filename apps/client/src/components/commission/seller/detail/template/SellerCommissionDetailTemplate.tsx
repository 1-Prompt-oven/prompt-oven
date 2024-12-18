"use client"
/* eslint-disable no-console -- 개발 중 디버깅을 위해 console 사용을 허용 */
import React from "react"
import { Card, CardContent } from "@repo/ui/card"
import { Button } from "@repo/ui/button"
import TitleDisplay from "@/components/commission/common/detail/TitleDisplay"
import DescriptionDisplay from "@/components/commission/common/detail/DescriptionDisplay"
import PriceDisplay from "@/components/commission/common/detail/PriceDisplay"
import DeadlineDisplay from "@/components/commission/common/detail/DeadlineDisplay"
import StatusDisplay from "@/components/commission/common/detail/StatusDisplay"
import ResultUploadField from "@/components/commission/seller/detail/molecule/ResultUploadField"
import RevisionNoteDisplay from "@/components/commission/seller/detail/molecule/RevisionNoteDisplay"
import type { CommissionDetailType } from "@/types/commission/commissionType"
import {
	statusUpdate,
	uploadResult,
	uploadRevision,
} from "@/action/commission/commissionAction"
import RequesterDisplay from "../../list/atom/RequesterDisplay"

interface SellerCommissionDetailTemplateProps {
	commission: CommissionDetailType
}

function SellerCommissionDetailTemplate({
	commission,
}: SellerCommissionDetailTemplateProps) {
	const handleAccept = async () => {
		console.log("Commission accepted")
		await statusUpdate({
			commissionUuid: commission.commissionUuid,
			status: "IN_PROGRESS",
		})
	}

	const handleReject = async () => {
		console.log("Commission rejected")
		await statusUpdate({
			commissionUuid: commission.commissionUuid,
			status: "REJECTED",
		})
	}

	const handleUploadResult = async (result: string) => {
		console.log("Result uploaded:", result)
		await uploadResult({
			commissionUuid: commission.commissionUuid,
			result,
		})
	}

	const handleUploadRevision = async (result: string) => {
		console.log("Revision uploaded:", result)
		await uploadRevision({
			commissionUuid: commission.commissionUuid,
			result,
		})
	}
	return (
		<div className="min-h-screen bg-black p-4 md:p-8">
			<div className="mx-auto max-w-3xl">
				<Card className="border-gray-800 bg-gray-950">
					<CardContent className="space-y-6 p-6">
						<div className="space-y-6">
							<TitleDisplay title={commission.commissionTitle} />
							<StatusDisplay status={commission.commissionStatus} />
							<DescriptionDisplay
								description={commission.commissionDescription}
							/>
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<PriceDisplay price={commission.commissionPrice} />
								<div className="xxxs:justify-between flex sm:justify-end sm:gap-8">
									<DeadlineDisplay deadline={commission.commissionDeadline} />
									<RequesterDisplay requesterName={commission.clientName} />
								</div>
							</div>
						</div>
						<div className="w-auto">
							{commission.commissionStatus === "REQUESTED" && (
								<div className="flex space-x-4">
									<Button
										onClick={handleAccept}
										className="bg-purple-600 hover:bg-purple-700">
										<span className="!xxxs:text-xs !sm:text-sm">Accept</span>
									</Button>
									<Button
										onClick={handleReject}
										variant="outline"
										className="!xxxs:text-xs border-red-500 text-red-500 hover:bg-red-500/10 sm:!text-sm">
										<span className="!xxxs:text-xs sm:!text-sm">Reject</span>
									</Button>
								</div>
							)}

							{commission.commissionStatus === "IN_PROGRESS" && (
								<ResultUploadField onUpload={handleUploadResult} />
							)}

							{commission.commissionStatus === "REVISION_REQUESTED" && (
								<div className="flex flex-col gap-4">
									<RevisionNoteDisplay
										note={commission.commissionModifyRequest || ""}
									/>
									<ResultUploadField onUpload={handleUploadRevision} />
								</div>
							)}

							{commission.commissionStatus === "COMPLETED" &&
							commission.commissionResult ? (
								<div className="space-y-4 border-t border-gray-800 pt-6">
									<h2 className="text-lg font-semibold text-white">Result</h2>
									<div className="rounded-lg bg-gray-900 p-4 text-gray-300">
										{commission.commissionResult}
									</div>
								</div>
							) : null}

							{commission.commissionStatus === "REVISION_COMPLETED" &&
							commission.commissionResult ? (
								<div className="space-y-4 border-t border-gray-800 pt-6">
									<h2 className="text-lg font-semibold text-white">
										Revision Result
									</h2>
									<div className="rounded-lg bg-gray-900 p-4 text-gray-300">
										{commission.commissionResult}
									</div>
								</div>
							) : null}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default SellerCommissionDetailTemplate
