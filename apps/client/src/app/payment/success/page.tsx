import { SuccessPage } from "@/components/payment/SuccessPage"
import { Suspense } from "react"

export default function page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SuccessPage />
		</Suspense>
	)
}
