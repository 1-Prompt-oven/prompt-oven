import React from "react"
import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { RsFormField } from "@/components/seller/molecule/RsFormField"
import type { SellerInfo } from "@/schema/seller.ts"
import { sellerInfoSchemaKeys } from "@/schema/seller.ts"

export interface BankInfoFieldsProps {
	register: UseFormRegister<SellerInfo>
	errors: FieldErrors<SellerInfo>
}
export function RsBankInfoFields({ register, errors }: BankInfoFieldsProps) {
	return (
		<>
			<RsFormField
				id={sellerInfoSchemaKeys.accountID}
				label="Account ID (은행계좌)"
				{...register(sellerInfoSchemaKeys.accountID)}
				error={errors.accountID?.message}
				placeholder="Enter your account ID"
			/>
			<RsFormField
				id={sellerInfoSchemaKeys.bankName}
				label="Bank Name"
				{...register(sellerInfoSchemaKeys.bankName)}
				error={errors.bankName?.message}
				placeholder="Enter your bank name"
			/>
		</>
	)
}
