import React from "react"
import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { RsAddressSearch } from "@/components/seller/molecule/RsAddressSearch"
import type { AddressInfo } from "@/schema/seller.ts"
import { addressSchemaKeys } from "@/schema/seller.ts"
import { RsFormField } from "@/components/seller/molecule/RsFormField.tsx"

export interface AddressFieldsProps {
	register: UseFormRegister<AddressInfo>
	errors: FieldErrors<AddressInfo>
	postcode: string
	address: string
	onAddressSearch: () => void
}

export function RsAddressFields({
	register,
	errors,
	postcode,
	address,
	onAddressSearch,
}: AddressFieldsProps) {
	return (
		<>
			<RsFormField
				id={addressSchemaKeys.postcode}
				label="Postcode"
				error={errors.postcode?.message}
				{...register(addressSchemaKeys.postcode)}
				InputComponent={
					<RsAddressSearch
						value={postcode}
						onClick={onAddressSearch}
						readOnly
						placeholder="Enter your postcode"
					/>
				}
			/>
			<RsFormField
				id={addressSchemaKeys.address}
				label="Address"
				{...register(addressSchemaKeys.address)}
				error={errors.address?.message}
				value={address}
				readOnly
				placeholder="Enter your address"
			/>
			<RsFormField
				id={addressSchemaKeys.detailAddress}
				label="Detail Address"
				{...register(addressSchemaKeys.detailAddress)}
				placeholder="Enter your detail address"
			/>
		</>
	)
}
