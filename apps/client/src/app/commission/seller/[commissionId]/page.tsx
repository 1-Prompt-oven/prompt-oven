import React from "react"

function page() {
	return <div>page</div>
}

export default page

// 판매자가 커미션 세부 내용 확인
// 상태에 따라 UI 변경 -> requested 일 때는 수락/거절 버튼, in_progress 일 때는 결과물 제출 버튼
// 결과물 제출 및 상태 업데이트
