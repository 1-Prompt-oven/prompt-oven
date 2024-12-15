import { getServerSession } from "next-auth"
import Favorite from "@/app/favorite/page"
import PurchaseEd from "@/app/purchase/ed/page"
import PurchaseIng from "@/app/purchase/ing/page"
import ContentWrapper from "@/components/account/template/ContentWrapper.tsx"
import type {
	AccountSearchParams,
	ProductListSearchParams,
} from "@/types/account/searchParams.ts"
import CreateProductPage from "@/components/product-create/page/CreateProductPage.tsx"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption"
import { getUserAuth } from "@/lib/userAuth.ts"
import SellerProductListPage from "@/components/seller/page/SellerProductListPage.tsx"
import { getSellerProductSearchParams } from "@/lib/sellerProduct.ts"
import Settings from "@/components/settings/templete/Settings.tsx"
import Cart from "@/app/cart/page"
import Dashboard from "@/components/dashboard/page/Dashboard"
import Profile from "@/app/profile/[id]/page"
import { getNickname } from "@/lib/api/sessionExtractor"
import ProfileModify from "@/app/profile/modify/[id]/page"

export default async function page({ searchParams }: AccountSearchParams) {
	// note: queryParam이 없는 경우 overview 사이드바 메뉴가 선택되게 하기 -- 필요에 따라 수정 필요
	const view = searchParams.view ?? "overview"

	const session = await getServerSession(authOptions)
	const userAuth = await getUserAuth()
	const userName = await getNickname()

	let _searchParams
	let sellerUuid = ""
	if (view === "product-list") {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- memberUUID는 세션에 있습니다.
		sellerUuid = session?.user?.memberUUID as string
		_searchParams = getSellerProductSearchParams(searchParams)
	}

	return (
		<ContentWrapper userAuth={userAuth}>
			{view === "create-product" && (
				<CreateProductPage session={session} searchParams={searchParams} />
			)}
			{view === "product-list" && (
				<SellerProductListPage
					searchParams={_searchParams as ProductListSearchParams}
					sellerUuid={sellerUuid}
				/>
			)}
			{view === "overview" && <Dashboard />}
			{view === "settings" && <Settings />}
			{view === "favorites" && <Favorite />}
			{view === "cart" && <Cart />}
			{view === "profile" && userName ? (
				<Profile params={{ id: userName }} />
			) : null}
			{view === "profile-modify" && userName ? (
				<ProfileModify params={{ id: userName }} />
			) : null}
			{view === "purchase-ongoing" && <PurchaseIng />}
			{view === "purchase-completed" && <PurchaseEd />}
			{view !== "purchase-ongoing" &&
				view !== "purchase-completed" &&
				view !== "favorites" &&
				null}
		</ContentWrapper>
	)
}
