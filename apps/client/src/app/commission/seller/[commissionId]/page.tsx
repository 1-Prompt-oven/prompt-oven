import React from "react"
import SellerCommissionDetailTemplate from "@/components/commission/seller/detail/template/SellerCommissionDetailTemplate"
import type { Commission } from "@/types/commission/commissionType"

const dummyCommissions: Commission[] = [
	{
		id: "1",
		title: "AI Prompt Engineering for E-commerce Product Descriptions",
		description:
			"Create a set of prompts that will generate compelling product descriptions for our e-commerce platform. The prompts should be optimized for conversion while maintaining brand voice.",
		price: 299.99,
		deadline: "2024-02-15",
		status: "requested",
		createdAt: "2024-01-15",
		requester: { id: "user1", name: "John Doe" },
	},
	{
		id: "2",
		title: "Chatbot Training Data for Customer Support",
		description:
			"Develop training data for a customer support chatbot. Ensure that the data covers various use cases and customer scenarios, with a focus on natural language responses.",
		price: 499.99,
		deadline: "2024-03-01",
		status: "in_progress",
		createdAt: "2024-01-20",
		requester: { id: "user2", name: "Jane Smith" },
	},
	{
		id: "3",
		title: "Social Media Ad Copy Generator",
		description:
			"Create AI prompts that generate engaging ad copy for social media platforms like Instagram and Facebook. Focus on short, catchy phrases and call-to-action strategies.",
		price: 199.99,
		deadline: "2024-02-28",
		status: "completed",
		createdAt: "2024-01-25",
		requester: { id: "user3", name: "Alice Johnson" },
		result:
			"Ad Copy Template:\n1. 'Boost your [target audience]'s day with [unique selling point]!'\n2. 'Discover the magic of [key feature] today!'",
	},
	{
		id: "4",
		title: "SEO Content Strategy Prompt Generator",
		description:
			"Develop a set of prompts that help in generating SEO-optimized content strategies for blogs and articles. Ensure that the strategies cover keyword analysis and trending topics.",
		price: 399.99,
		deadline: "2024-02-20",
		status: "revision_requested",
		createdAt: "2024-01-28",
		requester: { id: "user4", name: "Bob Brown" },
		revisionNote:
			"Please include examples for blog headings and meta descriptions.",
	},
	{
		id: "5",
		title: "Email Campaign Subject Line Generator",
		description:
			"Create AI prompts to generate compelling subject lines for email marketing campaigns. Focus on improving open rates while maintaining brand tone.",
		price: 149.99,
		deadline: "2024-02-12",
		status: "rejected",
		createdAt: "2024-01-18",
		requester: { id: "user5", name: "Charlie Davis" },
	},
]

function page({ params }: { params: { commissionId: string } }) {
	const commission =
		dummyCommissions.find((c) => c.id === params.commissionId) ||
		dummyCommissions[0]
	return <SellerCommissionDetailTemplate commission={commission} />
}

export default page

// 판매자가 커미션 세부 내용 확인
// 상태에 따라 UI 변경 -> requested 일 때는 수락/거절 버튼, in_progress 일 때는 결과물 제출 버튼
// 결과물 제출 및 상태 업데이트
