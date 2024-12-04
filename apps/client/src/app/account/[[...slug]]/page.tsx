import { getServerSession } from "next-auth"
import Favorite from "@/app/favorite/page"
import PurchaseEd from "@/app/purchase/ed/page"
import PurchaseIng from "@/app/purchase/ing/page"
import ContentWrapper from "@/components/account/template/ContentWrapper.tsx"
import type { AccountSearchParams } from "@/types/account/searchParams.ts"
import CreateProductPage from "@/components/product-create/page/CreateProductPage.tsx"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption"

export default async function page({ searchParams }: AccountSearchParams) {
	// note: queryParam이 없는 경우 overview 사이드바 메뉴가 선택되게 하기 -- 필요에 따라 수정 필요
	const view = searchParams.view ?? "overview"
	const session = await getServerSession(authOptions)
	return (
		<ContentWrapper queryParams={{ view }}>
			{view === "create-product" && (
				<CreateProductPage session={session} searchParams={searchParams} />
			)}
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
