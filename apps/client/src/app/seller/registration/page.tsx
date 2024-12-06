import SellerRegistration from "@/components/seller/page/RegisterSellerPage.tsx"
import SellerRegistrationTemplate from "@/components/seller/template/SellerRegistrationTemplate.tsx"
import { getRole } from "@/lib/api/sessionExtractor.ts"

export default async function RegistrationPage() {
	const role = await getRole()
	const isSeller = role === "seller"
	return (
		<SellerRegistrationTemplate isSeller={isSeller}>
			<SellerRegistration />
		</SellerRegistrationTemplate>
	)
}
