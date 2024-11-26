"use client"

import { useState } from "react"
import { Tag } from "@repo/ui/tag"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/custom-select"
import { Switch } from "@repo/ui/switch"
import PcTitle from "@/components/product-create/atom/PcTitle.tsx"
import { PcInput } from "@/components/product-create/atom/PcInput.tsx"
import { PcTextarea } from "@/components/product-create/atom/PcTextarea.tsx"
import { PriceStepper } from "@/components/product-create/atom/PcPriceStepper.tsx"

function CreateProductPage() {
	const [tags, setTags] = useState([
		{ id: 1, text: "Design", variant: "default" },
		{ id: 2, text: "UI", variant: "default" },
		{ id: 3, text: "Development", variant: "default", size: "sm" },
		{ id: 4, text: "Long Tag Example", variant: "outline", size: "md" },
		{ id: 5, text: "React", variant: "default", size: "md" },
	])

	const removeTag = (id: number) => {
		setTags(tags.filter((tag) => tag.id !== id))
	}

	const [blackValue, setBlackValue] = useState("")
	const [isChecked1, setIsChecked1] = useState(false)

	const [price, setPrice] = useState(1000)

	return (
		<div className="space-y-4">
			<PcTitle>Name and Prompt</PcTitle>
			<PcInput placeholder="test Pc input" />
			<PcTextarea placeholder="test Pc textarea" />

			<div>
				<h1 className="mb-4 text-2xl font-bold">Tag Component Demo</h1>
				<div className="flex flex-wrap gap-2">
					{tags.map((tag) => (
						<Tag
							key={tag.id}
							onClose={() => removeTag(tag.id)}
							variant={tag.variant as "default" | "outline"}
							size={tag.size as "sm" | "md" | "lg"}>
							{tag.text}
						</Tag>
					))}
				</div>
			</div>

			<div>
				<h2 className="mb-2 text-xl font-semibold">Black Variant</h2>
				<Select value={blackValue} onValueChange={setBlackValue}>
					<SelectTrigger variant="black" className="w-[280px]">
						<SelectValue placeholder="Select a programming language" />
					</SelectTrigger>
					<SelectContent variant="black">
						<SelectGroup>
							<SelectLabel>Frontend</SelectLabel>
							<SelectItem value="javascript" variant="black">
								JavaScript
							</SelectItem>
							<SelectItem value="typescript" variant="black">
								TypeScript
							</SelectItem>
							<SelectItem value="react" variant="black">
								React
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<p className="mt-2">Selected value: {blackValue}</p>
			</div>

			<Switch checked={isChecked1} onCheckedChange={setIsChecked1} />
			<Switch
				variant="purple"
				checked={isChecked1}
				onCheckedChange={setIsChecked1}
			/>

			<div className="w-full p-8">
				<h1 className="mb-4 text-2xl font-bold">Price Stepper Demo</h1>
				<PriceStepper
					min={1000}
					max={5000}
					step={500}
					value={price}
					onChange={setPrice}
				/>
				<p className="mt-4 text-center">Selected Price: ${price.toFixed(2)}</p>
			</div>
		</div>
	)
}

export default CreateProductPage
