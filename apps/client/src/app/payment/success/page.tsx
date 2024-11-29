import ContentWrapper from "@/components/account/template/ContentWrapper"
import { SuccessPage } from "@/components/payment/SuccessPage"
import { Suspense } from "react"

export default function page() {
	return (
		<ContentWrapper queryParams={{ view: "TossPaySuccess" }}>
			<Suspense fallback={<div>Loading...</div>}>
				<SuccessPage />
			</Suspense>
		</ContentWrapper>
	)
}
