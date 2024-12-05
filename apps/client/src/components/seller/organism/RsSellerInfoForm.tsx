// RsSellerInfoForm.tsx
import React from "react"
import type { UseFormReturn } from "react-hook-form"
import type { SellerInfo } from "@/schema/seller.ts"
import { RsTaxIDField } from "./RsTaxIDField.tsx"
import { RsBankInfoFields } from "./RsBankInfoFields.tsx"
import { RsPhoneField } from "./RsPhoneField.tsx"

export interface SellerInfoFormProps {
	form: UseFormReturn<SellerInfo>
	onValidSubmit: (data: SellerInfo) => void
}

export function RsSellerInfoForm({ form, onValidSubmit }: SellerInfoFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form

	return (
		<form
			id="rsSellerInfoForm"
			onSubmit={handleSubmit(onValidSubmit)}
			className="space-y-4">
			<RsTaxIDField register={register} error={errors.taxID?.message} />
			<RsBankInfoFields register={register} errors={errors} />
			<RsPhoneField register={register} error={errors.phone?.message} />
		</form>
	)
}
