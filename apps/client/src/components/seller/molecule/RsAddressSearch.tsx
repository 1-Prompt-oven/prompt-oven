import React from "react"
import { Search } from "@repo/ui/lucide"
import { RsInput } from "@/components/seller/atom/RsInput"
import { RsButton } from "@/components/seller/atom/RsButton"

interface AddressSearchProps {
	value: string
	onClick: () => void
	readOnly?: boolean
	placeholder?: string
}

export function RsAddressSearch({
	value,
	onClick,
	readOnly,
	placeholder,
}: AddressSearchProps) {
	return (
		<div className="flex">
			<RsInput
				value={value || ""}
				readOnly={readOnly}
				placeholder={placeholder}
				className="flex-grow"
			/>
			<RsButton type="button" className="ml-2" onClick={onClick}>
				<Search className="h-4 w-4" />
			</RsButton>
		</div>
	)
}
