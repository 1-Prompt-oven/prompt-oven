// RsAddressForm.tsx
import React from "react"
import type { UseFormReturn } from "react-hook-form"
import type { AddressInfo } from "@/schema/seller.ts"
import { RsAddressFields } from "./RsAddressFields.tsx"

export interface AddressFormProps {
	form: UseFormReturn<AddressInfo>
	onValidSubmit: (data: AddressInfo) => void
	onAddressSearch: () => void
}

export function RsAddressForm({
	form,
	onValidSubmit,
	onAddressSearch,
}: AddressFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = form

	const postcode = watch("postcode")
	const address = watch("address")

	return (
		<form
			id="rsAddressForm"
			onSubmit={handleSubmit(onValidSubmit)}
			className="space-y-4">
			<RsAddressFields
				register={register}
				errors={errors}
				postcode={postcode}
				address={address}
				onAddressSearch={onAddressSearch}
			/>
		</form>
	)
}
