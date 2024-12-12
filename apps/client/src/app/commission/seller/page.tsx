import React from "react"
import SellerListTemplate from "@/components/commission/seller/list/template/SellerListTemplate"
import type { Commission } from "@/types/commission/commissionType"

const dummyCommissions: Commission[] = [
	{
		id: "1",
		title: "AI-based E-commerce Product Description Generator",
		status: "in_progress",
		price: 299.99,
		createdAt: "2024-01-15",
		deadline: "2024-02-15",
		description:
			"Create an AI model to generate compelling product descriptions for our e-commerce platform.",
		requester: { id: "1", name: "John Doe" },
	},
	{
		id: "2",
		title: "Chatbot for Customer Support",
		status: "requested",
		price: 499.99,
		createdAt: "2024-01-18",
		deadline: "2024-03-01",
		description:
			"Develop a chatbot that can handle basic customer inquiries and route complex issues to human agents.",
		requester: { id: "2", name: "Jane Smith" },
	},
	{
		id: "3",
		title: "Sentiment Analysis Tool",
		status: "completed",
		price: 199.99,
		createdAt: "2024-01-10",
		deadline: "2024-01-25",
		description:
			"Build a sentiment analysis tool to analyze customer feedback from various social media platforms.",
		requester: { id: "3", name: "Alex Johnson" },
	},
	{
		id: "4",
		title: "AI-powered Content Summarizer",
		status: "revision_requested",
		price: 349.99,
		createdAt: "2024-01-20",
		deadline: "2024-02-20",
		description:
			"Create an AI model that can summarize long-form content into concise, readable summaries.",
		requester: { id: "4", name: "Emily Brown" },
	},
	{
		id: "5",
		title: "Personalized Product Recommendation Engine",
		status: "rejected",
		price: 599.99,
		createdAt: "2024-01-05",
		deadline: "2024-02-28",
		description:
			"Develop an AI-driven recommendation engine to suggest products based on user behavior and preferences.",
		requester: { id: "5", name: "Michael Wilson" },
	},
]

function SellerCommisionListPage() {
	return <SellerListTemplate commissions={dummyCommissions} />
}

export default SellerCommisionListPage
