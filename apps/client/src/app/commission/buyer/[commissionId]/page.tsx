import React from "react"
import { CommissionDetailTemplate } from "@/components/commission/buyer/detail/template/CommissionDetailTemplate"
import type { Commission } from "@/types/commission/commissionType"

const dummyCommission: Commission = {
	id: "1",
	title: "AI Prompt Engineering for E-commerce Product Descriptions",
	description:
		"Create a set of prompts that will generate compelling product descriptions for our e-commerce platform. The prompts should be optimized for conversion while maintaining brand voice.",
	price: 299.99,
	deadline: "2024-02-15",
	status: "completed",
	result:
		"Here are the optimized prompts for your e-commerce product descriptions:\n\n1. Base Template:\n[Product Name] is a [key feature] that [main benefit]. Perfect for [target audience], it [unique selling point].\n\n2. Feature Expansion:\nDesigned with [specific feature], [Product Name] offers [benefit 1] and [benefit 2]. Experience [emotional benefit] while [functional benefit].",
}

function page() {
	return <CommissionDetailTemplate commission={dummyCommission} />
}

export default page
