import Link from "next/link"

export default function ProfileTitle() {
	return (
		<div className="gradient-filter mx-6 flex h-[3.75rem] items-center justify-between rounded-lg border border-white/20 p-4">
			<span className="font-mulish text-xl font-bold text-white">
				내 프로필
			</span>
			<Link href="/account?view=profile-modify">
				<span className="font-mulish text-xs text-[#666666]">수정하기</span>
			</Link>
		</div>
	)
}
