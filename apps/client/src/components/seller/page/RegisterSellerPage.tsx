"use client"

import React, { useEffect, useRef, useState } from "react"
import type { Address } from "react-daum-postcode"
import DaumPostcode from "react-daum-postcode"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { RsProgress } from "@/components/seller/atom/RsProgress"
import { RsButton } from "@/components/seller/atom/RsButton"
import { RsSellerInfoForm } from "@/components/seller/organism/RsSellerInfoForm"
import { RsAddressForm } from "@/components/seller/organism/RsAddressForm"
import type { AddressInfo, SellerInfo } from "@/schema/seller.ts"
import { addressSchema, sellerInfoSchema } from "@/schema/seller.ts"
import RsLoadingButton from "@/components/seller/atom/RsLoadingButton.tsx"
import { RsRegistrationCompleteDialog } from "@/components/seller/molecule/RsRegistrationCompleteDialog.tsx"
import type { RegisterSellerRequestType } from "@/types/settlement/settlementType.ts"
import { registerSeller } from "@/action/settlement/settlementAction.ts"
import { delay } from "@/lib/utils.ts"

const TOTAL_STEPS = 2

export default function SellerRegistrationPage() {
	const [currentStep, setCurrentStep] = useState<number>(1)
	const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const modalRef = useRef<HTMLDivElement>(null)

	const AuthSession = useSession()
	const router = useRouter()

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

	const handlerRegisterSeller = async (
		reqBody: Omit<RegisterSellerRequestType, "memberID">,
	) => {
		await registerSeller(reqBody)
		await AuthSession.update()
		router.refresh()
	}

	const handleAddressSubmit = async () => {
		setIsSubmitting(true)
		// Here you would typically send the combined data to your backend
		const addressObj = addressForm.getValues()
		const reqBody: Omit<RegisterSellerRequestType, "memberID"> = {
			...sellerInfoForm.getValues(),
			postcode: addressObj.postcode,
			address: `${addressObj.address} ${addressObj.detailAddress ? `, (${addressObj.detailAddress})` : ""}`,
		}
		await handlerRegisterSeller(reqBody)

		await delay(1000)
		setIsSubmitting(false)
		setIsDialogOpen(true)
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

	const handleClickOutside = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			setIsAddressModalOpen(false)
		}
	}

	useEffect(() => {
		if (isAddressModalOpen) {
			document.addEventListener("mousedown", handleClickOutside)
		} else {
			document.removeEventListener("mousedown", handleClickOutside)
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [isAddressModalOpen])

	return (
		<div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-po-black-200 p-4">
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
							<RsLoadingButton
								type="submit"
								form="rsAddressForm"
								isLoading={isSubmitting}
								className="ml-auto w-[9.8rem] hover:bg-po-purple-50">
								Register as Seller
							</RsLoadingButton>
						)}
					</div>
				</CardContent>
			</Card>
			{isAddressModalOpen ? (
				<div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
					<div ref={modalRef} className="rounded-lg bg-white p-4">
						<DaumPostcode
							onComplete={handleComplete}
							scriptUrl="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
							style={{ width: "350px", height: "500px" }}
							autoClose
						/>
					</div>
				</div>
			) : null}

			<RsRegistrationCompleteDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
			/>
		</div>
	)
}
