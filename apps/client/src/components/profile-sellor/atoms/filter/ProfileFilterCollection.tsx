"use client"

import { RadioGroup, RadioGroupItem } from "@repo/ui/radio-group"
import { Label } from "@repo/ui/label"

const collections = [
	"Audioglyphs",
	"Autoglyphs",
	"CryptoCrystal",
	"CryptoArte",
	"CyberKongz",
]

export function ProfileFilterCollection({
	value = "",
	onChange,
}: {
	value?: string
	onChange?: (value: string) => void
}) {
	return (
		<RadioGroup value={value} onValueChange={onChange} className="space-y-2">
			{collections.map((collection) => (
				<div key={collection} className="flex items-center space-x-2">
					<RadioGroupItem
						value={collection}
						id={collection}
						className="border-white/70 text-white"
					/>
					<Label htmlFor={collection} className="text-sm text-white">
						{collection}
					</Label>
				</div>
			))}
		</RadioGroup>
	)
}

