import React from "react"

// buyer -> action 1: 결과물 수락, action 2: 수정 요청
// seller -> action 1: 수락 또는 결과물 제출 (in_progress 상태일 때), action 2: 거절

interface CommissionDataType {
	title: string
	description: string
	price: number
	deadline: string
	state: "requested" | "in_progress" | "completed"
}

interface CommissionDetailsProps {
	data: CommissionDataType
	role: "buyer" | "seller"
	onAction1?: () => void
	onAction2?: () => void
}

function CommissionDetails({
	data,
	role,
	onAction1,
	onAction2,
}: CommissionDetailsProps) {
	return (
		<div>
			{/* 공통 렌더링 */}
			<h2>{data.title}</h2>
			<p>{data.description}</p>
			<p>가격: {data.price}</p>
			<p>마감 기한: {data.deadline}</p>
			<p>상태: {data.state}</p>

			{/* 조건부 렌더링 */}
			{role === "buyer" && data.state === "completed" && (
				<div>
					<button onClick={onAction1}>결과물 수락</button>
					<button onClick={onAction2}>수정 요청</button>
				</div>
			)}

			{role === "seller" && data.state === "requested" && (
				<div>
					<button onClick={onAction1}>수락</button>
					<button onClick={onAction2}>거절</button>
				</div>
			)}

			{role === "seller" && data.state === "in_progress" && (
				<div>
					<textarea placeholder="결과물 입력..." />
					<button onClick={onAction1}>결과물 제출</button>
				</div>
			)}
		</div>
	)
}

export default CommissionDetails

// 공통 데이터 -> 제목, 설명, 가격, 마감 기한, 상태

// 구매자 -> 결과물 수락 or 수정 요청 버튼   (상태가 completed일 때)
// -> 진행 중 메시지 (상태가 in_progress일 때)

// 판매자 -> 수락 or 거절 버튼 (상태가 requested일 때)
// -> 결과물 입력 필드, 제출 버튼 (상태가 in_progress일 때)
