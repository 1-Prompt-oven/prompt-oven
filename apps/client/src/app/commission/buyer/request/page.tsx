import React from "react"
import BuyerRequestTemplate from "@/components/commission/buyer/request/template/BuyerRequestTemplate"

interface CommissionSearchParams {
	buyerUuid: string
	sellerUuid: string
}

function page({ searchParams }: { searchParams: CommissionSearchParams }) {
	const { buyerUuid, sellerUuid } = searchParams

	return <BuyerRequestTemplate buyerUuid={buyerUuid} sellerUuid={sellerUuid} />
}

export default page
