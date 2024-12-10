import React from "react"
import CommissionForm from "@/components/commission/buyer/request/organism/CommissionForm"

function page() {
	return (
		<div>
			<CommissionForm />
		</div>
	)
}

export default page

// zod 유효성 검사
// FormData POST 로 서버에 전송
// 성공 시 결제 페이지로 리다이렉트
