"use client"

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
	RevisionRequest,
} from "@/types/commission/commissionType"

interface CommissionDetailTemplateProps {
	commission: CommissionDetailType
}

export function CommissionDetailTemplate({
	commission,
}: CommissionDetailTemplateProps) {
	const [showRevisionForm, setShowRevisionForm] = useState(false)
	const handleAccept = () => {
		console.log("Commission accepted") // eslint-disable-line no-console -- 필요한 디버깅 로그 출력
	}

	const handleRevisionSubmit = (revision: RevisionRequest) => {
		console.log("Revision requested:", revision) // eslint-disable-line no-console -- 필요한 디버깅 로그 출력
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
						</div>

						{commission.commissionResult ? (
							<div className="space-y-4 border-t border-gray-800 pt-6">
								<h2 className="text-lg font-semibold text-white">Result</h2>
								<div className="rounded-lg bg-gray-900 p-4 text-gray-300">
									{commission.commissionResult}
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
								commissionId={commission.commissionUuid}
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
