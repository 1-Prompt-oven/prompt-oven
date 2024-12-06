import React from "react"
import type { UseFormRegister } from "react-hook-form"
import { RsFormField } from "@/components/seller/molecule/RsFormField"
import type { SellerInfo } from "@/schema/seller.ts"
import { sellerInfoSchemaKeys } from "@/schema/seller.ts"

export interface PhoneFieldProps {
	register: UseFormRegister<SellerInfo>
	error?: string
}
export function RsPhoneField({ register, error }: PhoneFieldProps) {
	return (
		<RsFormField
			id={sellerInfoSchemaKeys.phone}
			label="Phone Number"
			{...register(sellerInfoSchemaKeys.phone)}
			error={error}
			placeholder="Enter your phone number"
		/>
	)
}
