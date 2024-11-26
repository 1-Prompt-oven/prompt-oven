import PcTitle from "@/components/product-create/atom/PcTitle.tsx"
import { PcInput } from "@/components/product-create/atom/PcInput.tsx"
import { PcTextarea } from "@/components/product-create/atom/PcTextarea.tsx"

function CreateProductPage() {
	return (
		<div className="space-y-4">
			<PcTitle>Name and Prompt</PcTitle>
			<PcInput placeholder="test Pc input" />
			<PcTextarea placeholder="test Pc textarea" />
		</div>
	)
}

export default CreateProductPage
