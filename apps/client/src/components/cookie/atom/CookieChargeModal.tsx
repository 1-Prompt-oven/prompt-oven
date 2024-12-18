"use client"

import { useState } from "react"
import { Button } from "@repo/ui/button"
import { RadioGroup, RadioGroupItem } from "@repo/ui/radio-group"
import { loadTossPayments } from "@tosspayments/tosspayments-sdk"

interface CookiePurchaseModalProps {
	isOpen: boolean // 모달 열림 여부
	onClose: () => void // 모달 닫기 함수
	onConfirm: (cookieAmount: number) => void // 구매 확인 함수
	userUuid: string
}

function generateCustomerKey(userUuid: string): string {
	const randomString = Math.random().toString(36).slice(2, 6) // 4자리 랜덤 문자열
	const specialChars = "-_=.@"
	const specialChar = specialChars.charAt(
		Math.floor(Math.random() * specialChars.length),
	) // 특수문자 하나 선택

	// userUuid와 랜덤 문자열, 특수문자 결합
	return `${userUuid}${specialChar}${randomString}`
}

function CookiePurchaseRadio({
	isOpen,
	onClose,
	onConfirm,
	userUuid,
}: CookiePurchaseModalProps) {
	const options = [
		{ value: 50, label: "50개" },
		{ value: 100, label: "100개" },
		{ value: 200, label: "200개" },
		{ value: 300, label: "300개" },
		{ value: 500, label: "500개" },
	]

	const unitPrice = 100 // 쿠키 1개당 가격
	const [selectedOption, setSelectedOption] = useState<number | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const handleSelection = (value: number) => {
		setSelectedOption(value)
	}

	const handlePurchase = async () => {
		if (!selectedOption) return

		setIsLoading(true) // 로딩 상태 시작
		try {
			const totalAmount = selectedOption * unitPrice
			const orderId = `order-${Date.now()}`

			// TossPayments SDK 로드
			const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
			if (!clientKey) {
				throw new Error(
					"Toss client key is not defined in environment variables.",
				)
			}
			const tossPayments = await loadTossPayments(clientKey)

			const customerKey = generateCustomerKey(userUuid)

			const payment = tossPayments.payment({ customerKey })

			// 결제 요청
			payment.requestPayment({
				//eslint-disable-next-line object-shorthand -- no problem
				orderId: orderId,
				orderName: `쿠키 ${selectedOption}개`,
				successUrl: `${window.location.origin}/cookiepayment/success`,
				failUrl: `${window.location.origin}/cookiepayment/fail`,
				method: "CARD",
				amount: { currency: "KRW", value: totalAmount },
			})

			// 구매 확인 콜백 호출
			onConfirm(selectedOption)
		} catch (error) {
			// eslint-disable-next-line no-console -- This is a server-side only log
			console.error("결제 실패:", error)
		} finally {
			setIsLoading(false) // 로딩 상태 종료
		}
	}

	return (
		<>
			{/* eslint-disable-next-line react/jsx-no-leaked-render -- no problem */}
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="w-96 rounded-lg bg-[#1a1a1a] p-6 shadow-lg">
						<h2 className="mb-4 text-lg font-semibold text-purple-400">
							쿠키 구매하기
						</h2>
						<RadioGroup
							className="space-y-3 text-white"
							value={selectedOption?.toString() || ""}
							onValueChange={(value) => handleSelection(Number(value))}>
							{options.map((option) => (
								<label
									key={option.value}
									className={`flex cursor-pointer items-center justify-between gap-3 rounded-md border-2 p-3 ${
										selectedOption === option.value
											? "custom-radio-selected"
											: "custom-radio-default"
									}`}>
									<div className="flex items-center justify-end gap-3">
										<RadioGroupItem
											id={`option-${option.value}`}
											value={option.value.toString()}
											className="form-radio text-purple-500"
										/>
										<span className="text-black">{option.label}</span>
									</div>
									<span className="text-black">
										{option.value * unitPrice}원
									</span>
								</label>
							))}
						</RadioGroup>
						<div className="mt-6 text-center">
							<p className="text-gray-400">
								총 금액:{" "}
								<span className="font-bold text-purple-500">
									{selectedOption ? selectedOption * unitPrice : 0}원
								</span>
							</p>
						</div>
						<div className="mt-6 flex justify-end gap-4">
							<Button
								disabled={isLoading || !selectedOption}
								className={
									selectedOption
										? "bg-purple-500 text-white hover:bg-purple-600"
										: "cursor-not-allowed bg-gray-500"
								}
								onClick={handlePurchase}>
								{isLoading ? "구매 진행 중..." : "구매하기"}
							</Button>
							<Button
								variant="ghost"
								className="text-gray-400"
								onClick={onClose}>
								취소
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default CookiePurchaseRadio
