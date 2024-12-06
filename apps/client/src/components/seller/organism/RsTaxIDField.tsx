import React from "react"
import type { UseFormRegister } from "react-hook-form"
import { RsTooltipField } from "@/components/seller/molecule/RsTooltipField"
import type { SellerInfo } from "@/schema/seller.ts"
import { sellerInfoSchemaKeys } from "@/schema/seller.ts"

export interface TaxIDFieldProps {
	register: UseFormRegister<SellerInfo>
	error?: string
}
export function RsTaxIDField({ register, error }: TaxIDFieldProps) {
	return (
		<RsTooltipField
			id={sellerInfoSchemaKeys.taxID}
			label="Tax ID (주민등록번호 or 사업자등록번호)"
			tooltipContent="Enter your personal or business tax identification number"
			{...register(sellerInfoSchemaKeys.taxID)}
			error={error}
			placeholder="Enter your tax ID"
		/>
	)
}
