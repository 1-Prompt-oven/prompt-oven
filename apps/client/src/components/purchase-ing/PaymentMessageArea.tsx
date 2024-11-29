import React from "react"

export default function PaymentMessageArea({ comment }: { comment: string }) {
	return (
		<textarea
			name="message"
			placeholder={comment}
			className="h-[130px] resize-none rounded-lg border border-[#d8d8d8] p-3"
		/>
	)
}
