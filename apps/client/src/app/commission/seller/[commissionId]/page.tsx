import React from "react"
import SellerCommissionDetailTemplate from "@/components/commission/seller/detail/template/SellerCommissionDetailTemplate"
import type { CommissionDetailType } from "@/types/commission/commissionType"

const dummyCommissions: CommissionDetailType[] = [
	{
		commissionUuid: "1",
		clientUuid: "user1",
		creatorUuid: "creator1",
		commissionTitle:
			"AI Prompt Engineering for E-commerce Product Descriptions",
		commissionDescription:
			"Create a set of prompts that will generate compelling product descriptions for our e-commerce platform. The prompts should be optimized for conversion while maintaining brand voice.",
		commissionPrice: 299.99,
		commissionDeadline: "2024-02-15",
		commissionModel: "GPT-4",
		commissionRequest: "Initial Request",
		commissionModifyRequest: "",
		commissionStatus: "REQUESTED",
		commissionResult: "",
		role: "seller",
	},
	{
		commissionUuid: "2",
		clientUuid: "user2",
		creatorUuid: "creator2",
		commissionTitle: "Chatbot Training Data for Customer Support",
		commissionDescription:
			"Develop training data for a customer support chatbot. Ensure that the data covers various use cases and customer scenarios, with a focus on natural language responses.",
		commissionPrice: 499.99,
		commissionDeadline: "2024-03-01",
		commissionModel: "GPT-4",
		commissionRequest: "Initial Request",
		commissionModifyRequest: "",
		commissionStatus: "IN_PROGRESS",
		commissionResult: "",
		role: "seller",
	},
	{
		commissionUuid: "3",
		clientUuid: "user3",
		creatorUuid: "creator3",
		commissionTitle: "Social Media Ad Copy Generator",
		commissionDescription:
			"Create AI prompts that generate engaging ad copy for social media platforms like Instagram and Facebook. Focus on short, catchy phrases and call-to-action strategies.",
		commissionPrice: 199.99,
		commissionDeadline: "2024-02-28",
		commissionModel: "GPT-4",
		commissionRequest: "Initial Request",
		commissionModifyRequest: "",
		commissionStatus: "COMPLETED",
		commissionResult:
			"Ad Copy Template:\n1. 'Boost your [target audience]'s day with [unique selling point]!'\n2. 'Discover the magic of [key feature] today!'",
		role: "seller",
	},
	{
		commissionUuid: "4",
		clientUuid: "user4",
		creatorUuid: "creator4",
		commissionTitle: "SEO Content Strategy Prompt Generator",
		commissionDescription:
			"Develop a set of prompts that help in generating SEO-optimized content strategies for blogs and articles. Ensure that the strategies cover keyword analysis and trending topics.",
		commissionPrice: 399.99,
		commissionDeadline: "2024-02-20",
		commissionModel: "GPT-4",
		commissionRequest: "Initial Request",
		commissionModifyRequest:
			"Please include examples for blog headings and meta descriptions.",
		commissionStatus: "REVISION_REQUESTED",
		commissionResult: "",
		role: "seller",
	},
	{
		commissionUuid: "5",
		clientUuid: "user5",
		creatorUuid: "creator5",
		commissionTitle: "Email Campaign Subject Line Generator",
		commissionDescription:
			"Create AI prompts to generate compelling subject lines for email marketing campaigns. Focus on improving open rates while maintaining brand tone.",
		commissionPrice: 149.99,
		commissionDeadline: "2024-02-12",
		commissionModel: "GPT-4",
		commissionRequest: "Initial Request",
		commissionModifyRequest: "",
		commissionStatus: "REJECTED",
		commissionResult: "",
		role: "seller",
	},
]

function page({ params }: { params: { commissionId: string } }) {
	const commission =
		dummyCommissions.find((c) => c.commissionUuid === params.commissionId) ||
		dummyCommissions[0]
	return <SellerCommissionDetailTemplate commission={commission} />
}

export default page

// 판매자가 커미션 세부 내용 확인
// 상태에 따라 UI 변경 -> requested 일 때는 수락/거절 버튼, in_progress 일 때는 결과물 제출 버튼
// 결과물 제출 및 상태 업데이트
