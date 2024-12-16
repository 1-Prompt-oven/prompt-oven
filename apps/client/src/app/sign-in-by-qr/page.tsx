import SignInByQrPage from "@/components/sign-in-by-qr/molecule/signInByQrPage.tsx"

export default function page({
	searchParams,
}: {
	searchParams: {
		userId: string
		userPw: string
	}
}) {
	return (
		<SignInByQrPage userId={searchParams.userId} userPw={searchParams.userPw} />
	)
}
