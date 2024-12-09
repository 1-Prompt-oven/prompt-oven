import React, { Suspense } from "react"
import Link from "next/link"
import { Bell, MessageSquareText } from "@repo/ui/lucide"
import CommonHeader from "@/components/common/atom/Header"
import MainLogo from "@/components/common/atom/icon/MainLogo.tsx"
import { AvatarMenu } from "@/components/common/molecule/AvatarMenu.tsx"
import BadgeContainer from "@/components/common/atom/BadgeContainer.tsx"
import { SideBarMenu } from "@/components/common/organism/SideBarMenu.tsx"
import MainHeaderLinkList from "@/components/common/atom/MainHeaderLinkList.tsx"
import { getUserAuth } from "@/lib/userAuth.ts"
import GradientLink from "@/components/common/molecule/GradientLink.tsx"
import SearchInputWrapper from "../atom/SearchInputWrapper"
import CartCountBadge from "../atom/icon/CartCountBadge"

export default async function MainHeader() {
	const userAuth = await getUserAuth()

	return (
		<CommonHeader className="fixed left-0 right-0 z-20 h-20 bg-po-black-200">
			{/* Logo */}
			<Link href="/" className="pr-4">
				<MainLogo />
			</Link>

			{/* todo: 검색 다이얼로그 컴포넌트 추가 필요 - 모바일 또는 태블릿인 경우 검색 아이콘으로 바뀌는 반응형 작업도 필요함 */}
			<div className="box-border flex h-full max-w-2xl flex-1 items-center px-10 lg:border-x lg:border-[#424242]">
				{/* <div className="h-8 w-full bg-po-gray-100" /> */}
				<SearchInputWrapper className="h-8 w-full" />
			</div>

			{/* Navigation */}
			<MainHeaderLinkList />

			{/* Right side buttons */}
			<div className="ml-5 flex items-center gap-5">
				{/* todo: 현재는 BadgeContainer로만 표현했지만 알림은 알림과 관련된 모달을 띄우고 메시지와 카트는 해당 페이지로 이동해야한다. 그 이후에 컴포넌트로 정의하기*/}

				{userAuth !== "guest" ? (
					<>
						<div className="hidden gap-5 sm:!flex">
							<BadgeContainer count={2}>
								<Bell className="!h-7 !w-7 text-po-gray-150" strokeWidth={2} />
							</BadgeContainer>
							<BadgeContainer count={10}>
								<MessageSquareText
									className="!h-7 !w-7 text-po-gray-150"
									strokeWidth={2}
								/>
							</BadgeContainer>
							<Link href="/cart">
								<CartCountBadge userAuth={userAuth} />
							</Link>
						</div>
						<AvatarMenu userAuth={userAuth} />
					</>
				) : (
					<GradientLink href="/sign-in" className="hidden lg:!flex">
						Sign In
					</GradientLink>
				)}

				{/* Mobile menu button */}
				<Suspense fallback={null}>
					<SideBarMenu userAuth={userAuth} />
				</Suspense>
			</div>
		</CommonHeader>
	)
}

