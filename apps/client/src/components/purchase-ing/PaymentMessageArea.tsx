import React from "react"

interface PaymentMessageAreaProps {
	comment: string
	onMessageChange: (message: string) => void // 메시지 변경 핸들러
}

export default function PaymentMessageArea({
	comment,
	onMessageChange,
}: PaymentMessageAreaProps) {
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		onMessageChange(event.target.value) // 입력된 메시지를 부모 컴포넌트로 전달
	}

	return (
		<textarea
			name="message"
			placeholder={comment}
			className="h-[130px] resize-none rounded-lg border border-[#d8d8d8] p-3"
			onChange={handleChange} // 핸들러를 수정하여 호출
		/>
	)
}
