"use client"

import { useState } from "react"
import { Button } from "@repo/ui/button"
import { RadioGroup, RadioGroupItem } from "@repo/ui/radio-group"
import { createCookiePayment } from "@/action/cookie/cookiePaymentAction"
import { getDummyCookiePaymentData } from "@/types/cookie/cookiePayment"
import SuccessModal from "@/components/common/atom/SuccessModal"

interface CookiePurchaseModalProps {
	isOpen: boolean // 모달 열림 여부
	onClose: () => void // 모달 닫기 함수
	onConfirm: (cookieAmount: number) => void // 구매 확인 함수
}

function CookiePurchaseRadio({
	isOpen,
	onClose,
	onConfirm,
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
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false) // 성공 모달 상태 추가

	const handleSelection = (value: number) => {
		setSelectedOption(value)
	}

	const handlePurchase = async () => {
		if (!selectedOption) return

		setIsLoading(true) // 로딩 상태 시작
		try {
			const dummyData = getDummyCookiePaymentData(selectedOption)

			// API 호출
			await createCookiePayment({
				cookieAmount: dummyData.cookieAmount,
				totalAmount: dummyData.totalAmount,
				message: dummyData.message,
				orderId: dummyData.orderId,
				orderName: dummyData.orderName,
				paymentMethod: dummyData.paymentMethod,
				paymentWay: dummyData.paymentWay,
			})

			// 구매 확인 콜백 호출
			onConfirm(selectedOption)

			// 성공 모달 열기
			setIsSuccessModalOpen(true)
			onClose() // 구매 모달 닫기
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
			<SuccessModal
				/* eslint-disable-next-line react/jsx-no-leaked-render -- no problem */
				isOpen={isSuccessModalOpen && !isOpen} // 구매 모달이 닫혀 있을 때만 성공 모달 표시
				onClose={() => setIsSuccessModalOpen(false)}>
				<p className="text-center text-white">
					쿠키 구매가 성공적으로 완료되었습니다!
				</p>
			</SuccessModal>
		</>
	)
}

export default CookiePurchaseRadio
