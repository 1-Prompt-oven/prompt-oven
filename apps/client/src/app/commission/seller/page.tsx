import React from "react"
import SellerListTemplate from "@/components/commission/seller/list/template/SellerListTemplate"
import type { CommissionListType } from "@/types/commission/commissionType"

const dummyCommissions: CommissionListType[] = [
	{
		commissionUuid: "1",
		title: "AI Writing Assistant Development",
		clientUuid: "user123",
		price: 300,
		deadline: "2024-12-31",
		status: "REQUESTED",
		requestedDate: "2024-12-01",
	},
	{
		commissionUuid: "2",
		title: "E-commerce Product Page Redesign",
		clientUuid: "user456",
		price: 500,
		deadline: "2025-01-15",
		status: "IN_PROGRESS",
		requestedDate: "2024-12-05",
	},
	{
		commissionUuid: "3",
		title: "Custom Data Analysis Dashboard",
		clientUuid: "user789",
		price: 700,
		deadline: "2025-02-10",
		status: "COMPLETED",
		requestedDate: "2024-12-10",
	},
	{
		commissionUuid: "4",
		title: "Translation of Technical Documentation",
		clientUuid: "user321",
		price: 200,
		deadline: "2024-12-20",
		status: "REVISION_REQUESTED",
		requestedDate: "2024-11-30",
	},
	{
		commissionUuid: "5",
		title: "Logo Design for Startup",
		clientUuid: "user654",
		price: 100,
		deadline: "2024-12-25",
		status: "REJECTED",
		requestedDate: "2024-12-02",
	},
]

function SellerCommisionListPage() {
	return <SellerListTemplate initialCommissions={dummyCommissions} />
}

export default SellerCommisionListPage
