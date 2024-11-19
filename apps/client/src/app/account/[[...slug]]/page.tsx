import ContentWrapper from "@/components/account/template/ContentWrapper.tsx"
import type { SearchParams } from "@/types/account/searchParams.ts"

export default function page({ searchParams }: SearchParams) {
	// note: queryParam이 없는 경우 overview 사이드바 메뉴가 선택되게 하기 -- 필요에 따라 수정 필요
	const view = searchParams.view ?? "overview"
	return (
		<ContentWrapper queryParams={{ view }}>
			<div className="text-white">test text {searchParams.view}</div>
		</ContentWrapper>
	)
}
