import { Suspense } from "react"
import ContentWrapper from "@/components/account/template/ContentWrapper"
import { getUserAuth } from "@/lib/userAuth.ts"
import FailPage from "@/components/payment/FailPage"

export default async function WidgetFail() {
	// note: 컴포넌트를 수정하면서 queryParams={{ view: "TossPaySuccess" }} 부분이 필요없어짐
	// note: 문제가 생기면 수정이 필요함 !!
	const userAuth = await getUserAuth()
	return (
		<ContentWrapper userAuth={userAuth}>
			<Suspense fallback={<div>Loading...</div>}>
				<FailPage />
			</Suspense>
		</ContentWrapper>
	)
}
