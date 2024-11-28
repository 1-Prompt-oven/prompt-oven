import Favorite from "@/app/favorite/page"
import PurchaseEd from "@/app/purchase/ed/page"
import PurchaseIng from "@/app/purchase/ing/page"
import ContentWrapper from "@/components/account/template/ContentWrapper.tsx"
import type { SearchParams } from "@/types/account/searchParams.ts"
import CreateProductFirstPage from "@/components/product-create/page/CreateProductFirstPage.tsx"
import CreateProductSecondTextPage from "@/components/product-create/page/CreateProductSecondTextPage.tsx"

export default function page({ searchParams }: SearchParams) {
	// note: queryParam이 없는 경우 overview 사이드바 메뉴가 선택되게 하기 -- 필요에 따라 수정 필요
	const view = searchParams.view ?? "overview"
	return (
		<ContentWrapper queryParams={{ view }}>
			{view === "create-product" && <CreateProductFirstPage />}
			{view === "product-list" && <CreateProductSecondTextPage />}
			{view === "favorites" && <Favorite />}
			{view === "purchase-ongoing" && <PurchaseIng />}
			{view === "purchase-completed" && <PurchaseEd />}
			{view !== "purchase-ongoing" &&
				view !== "purchase-completed" &&
				view !== "favorites" &&
				null}
		</ContentWrapper>
	)
}
