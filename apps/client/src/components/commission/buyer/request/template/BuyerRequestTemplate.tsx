import React from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/ui/card"
import { CommissionForm } from "../organism/CommissionForm"

interface BuyerRequestTemplateProps {
	buyerUuid: string
	sellerUuid: string
}

function BuyerRequestTemplate({
	buyerUuid,
	sellerUuid,
}: BuyerRequestTemplateProps) {
	return (
		<div className="min-h-screen bg-black p-4 md:p-8">
			<div className="mx-auto max-w-3xl">
				<Card className="border-gray-800 bg-gray-950">
					<CardHeader>
						<CardTitle className="text-2xl text-white">
							Create New Commission
						</CardTitle>
						<CardDescription className="text-gray-400">
							Fill out the details for your commission request
						</CardDescription>
					</CardHeader>
					<CardContent>
						<CommissionForm buyerUuid={buyerUuid} sellerUuid={sellerUuid} />
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default BuyerRequestTemplate
