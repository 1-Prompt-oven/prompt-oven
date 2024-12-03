import { Suspense } from "react"
import ContentWrapper from "@/components/account/template/ContentWrapper"
import { SuccessPage } from "@/components/payment/SuccessPage"

export default function page() {
	return (
		<ContentWrapper queryParams={{ view: "TossPaySuccess" }}>
			<Suspense fallback={<div>Loading...</div>}>
				<SuccessPage />
			</Suspense>
		</ContentWrapper>
	)
}
