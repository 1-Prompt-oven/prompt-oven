"use client"
/* eslint-disable no-console -- 개발 중 디버깅을 위해 console 사용을 허용 */
import React, { useState } from "react"
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

interface SellerCommissionDetailTemplateProps {
	commission: CommissionDetailType
}

function SellerCommissionDetailTemplate({
	commission: initialCommission,
}: SellerCommissionDetailTemplateProps) {
	const [commission, setCommission] =
		useState<CommissionDetailType>(initialCommission)

	const handleAccept = () => {
		console.log("Commission accepted")
		setCommission((prev) => ({ ...prev, status: "in_progress" }))
	}

	const handleReject = () => {
		console.log("Commission rejected")
		setCommission((prev) => ({ ...prev, status: "rejected" }))
	}

	const handleUploadResult = (result: string) => {
		console.log("Result uploaded:", result)
		setCommission((prev) => ({ ...prev, status: "completed", result }))
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
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<PriceDisplay price={commission.commissionPrice} />
								<DeadlineDisplay deadline={commission.commissionDeadline} />
							</div>
							<div className="text-gray-300">
								<p>Requested by: {commission.clientUuid}</p>
								<p>
									Requested on:{" "}
									{new Date(commission.commissionRequest).toLocaleDateString()}
								</p>
							</div>
						</div>

						{commission.commissionStatus === "REQUESTED" && (
							<div className="flex space-x-4">
								<Button
									onClick={handleAccept}
									className="bg-purple-600 hover:bg-purple-700">
									Accept Commission
								</Button>
								<Button
									onClick={handleReject}
									variant="outline"
									className="border-red-500 text-red-500 hover:bg-red-500/10">
									Reject Commission
								</Button>
							</div>
						)}

						{commission.commissionStatus === "IN_PROGRESS" && (
							<ResultUploadField onUpload={handleUploadResult} />
						)}

						{commission.commissionStatus === "REVISION_REQUESTED" && (
							<>
								<RevisionNoteDisplay
									note={commission.commissionModifyRequest || ""}
								/>
								<ResultUploadField onUpload={handleUploadResult} />
							</>
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
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default SellerCommissionDetailTemplate
