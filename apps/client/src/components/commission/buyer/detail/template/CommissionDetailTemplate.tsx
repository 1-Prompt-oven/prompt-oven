"use client"
/* eslint-disable no-console -- 개발 중 디버깅을 위해 console 사용을 허용 */
import { useState } from "react"
import { Card, CardContent } from "@repo/ui/card"
import TitleDisplay from "@/components/commission/common/detail/TitleDisplay"
import DescriptionDisplay from "@/components/commission/common/detail/DescriptionDisplay"
import PriceDisplay from "@/components/commission/common/detail/PriceDisplay"
import DeadlineDisplay from "@/components/commission/common/detail/DeadlineDisplay"
import StatusDisplay from "@/components/commission/common/detail/StatusDisplay"
import ActionButtons from "@/components/commission/common/detail/ActionButtons"
import RevisionRequestForm from "@/components/commission/buyer/detail/molecule/RevisionRequestForm"
import type {
	CommissionDetailType,
	RevisionRequestType,
} from "@/types/commission/commissionType"
import {
	statusUpdate,
	requestModification,
} from "@/action/commission/commissionAction"
import CreatorDisplay from "../atom/CreatorDisplay"

interface CommissionDetailTemplateProps {
	commission: CommissionDetailType
}

export function CommissionDetailTemplate({
	commission,
}: CommissionDetailTemplateProps) {
	const [showRevisionForm, setShowRevisionForm] = useState(false)

	const handleAccept = async () => {
		console.log("Commission accepted")
		await statusUpdate({
			commissionUuid: commission.commissionUuid,
			status: "COMPLETED",
		})
	}

	const handleRevisionSubmit = async (revision: RevisionRequestType) => {
		console.log("Revision requested:", revision)
		setShowRevisionForm(false)
		await requestModification(revision)
		await statusUpdate({
			commissionUuid: commission.commissionUuid,
			status: "REVISION_REQUESTED",
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
								<div className="flex xxxs:justify-between sm:justify-end sm:gap-8">
									<DeadlineDisplay deadline={commission.commissionDeadline} />
									<CreatorDisplay creatorName={commission.creatorName} />
								</div>
							</div>
						</div>

						{commission.commissionResult ? (
							<div className="space-y-4 border-t border-gray-800 pt-6">
								<h2 className="text-lg font-semibold text-white">Result</h2>
								<div className="rounded-lg bg-gray-900 p-4 text-gray-300">
									{commission.commissionResult}
								</div>
							</div>
						) : null}

						{commission.commissionStatus === "REVISION_REQUESTED" ? (
							<div className="space-y-4 pt-1">
								<h2 className="text-lg font-semibold text-white">
									Modification Request
								</h2>
								<div className="rounded-lg bg-gray-900 p-4 text-gray-300">
									{commission.commissionModifyRequest}
								</div>
							</div>
						) : null}

						{!showRevisionForm ? (
							<ActionButtons
								status={commission.commissionStatus}
								onAccept={handleAccept}
								onRequestRevision={() => setShowRevisionForm(true)}
							/>
						) : null}

						{showRevisionForm ? (
							<RevisionRequestForm
								commissionUuid={commission.commissionUuid}
								onSubmit={handleRevisionSubmit}
								onCancel={() => setShowRevisionForm(false)}
							/>
						) : null}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
