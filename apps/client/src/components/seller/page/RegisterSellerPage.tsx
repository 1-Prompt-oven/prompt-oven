"use client"

import React, { useState } from "react"
import type { Address } from "react-daum-postcode"
import DaumPostcode from "react-daum-postcode"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RsProgress } from "@/components/seller/atom/RsProgress"
import { RsButton } from "@/components/seller/atom/RsButton"
import { RsSellerInfoForm } from "@/components/seller/organism/RsSellerInfoForm"
import { RsAddressForm } from "@/components/seller/organism/RsAddressForm"
import type { AddressInfo, SellerInfo } from "@/schema/seller.ts"
import { addressSchema, sellerInfoSchema } from "@/schema/seller.ts"

const TOTAL_STEPS = 2

export default function SellerRegistrationPage() {
	const [currentStep, setCurrentStep] = useState<number>(1)
	const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false)

	const sellerInfoForm = useForm<SellerInfo>({
		resolver: zodResolver(sellerInfoSchema),
		mode: "onChange",
		defaultValues: {
			taxID: "",
			accountID: "",
			bankName: "",
			phone: "",
		},
	})

	const addressForm = useForm<AddressInfo>({
		resolver: zodResolver(addressSchema),
		mode: "onChange",
		defaultValues: {
			postcode: "",
			address: "",
			detailAddress: "",
		},
	})

	const handleSellerInfoSubmit = () => {
		setCurrentStep(2)
	}

	const handleAddressSubmit = () => {
		// Here you would typically send the combined data to your backend
	}

	const handleAddressSearch = () => {
		setIsAddressModalOpen(true)
	}

	const handleComplete = (data: Address) => {
		addressForm.setValue("postcode", data.zonecode)
		addressForm.setValue("address", data.address)
		setIsAddressModalOpen(false)
	}

	const handlePrevious = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1)
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-po-black-200 p-4">
			<Card className="w-full max-w-2xl border-[#A913F9]/50 bg-po-black-150">
				<CardHeader>
					<CardTitle className="text-center text-2xl font-semibold text-white">
						Seller Registration
					</CardTitle>
				</CardHeader>
				<CardContent>
					<RsProgress
						value={(currentStep / TOTAL_STEPS) * 100}
						className="mb-6"
					/>
					{currentStep === 1 ? (
						<RsSellerInfoForm
							form={sellerInfoForm}
							onValidSubmit={handleSellerInfoSubmit}
						/>
					) : (
						<RsAddressForm
							form={addressForm}
							onValidSubmit={handleAddressSubmit}
							onAddressSearch={handleAddressSearch}
						/>
					)}
					<div className="mt-6 flex justify-between">
						{currentStep > 1 && (
							<RsButton variant="secondary" onClick={handlePrevious}>
								Previous
							</RsButton>
						)}
						{currentStep < TOTAL_STEPS ? (
							<RsButton
								type="submit"
								form="rsSellerInfoForm"
								className="ml-auto hover:bg-po-purple-50">
								Next
							</RsButton>
						) : (
							<RsButton
								type="submit"
								form="rsAddressForm"
								className="ml-auto hover:bg-po-purple-50">
								Register as Seller
							</RsButton>
						)}
					</div>
				</CardContent>
			</Card>
			{isAddressModalOpen ? (
				<div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
					<div className="rounded-lg bg-white p-4">
						<DaumPostcode onComplete={handleComplete} autoClose />
					</div>
				</div>
			) : null}
		</div>
	)
}
