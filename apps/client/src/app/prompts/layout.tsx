import React from "react"
import MainFooter from "@/components/main/organism/MainFooter"
import ToTopButton from "@/components/common/atom/ToTopButton"

export default function layout({
	children,
}: {
	children: Readonly<React.ReactNode>
}) {
	return (
		<>
			{children}
			<ToTopButton />
			<MainFooter />
		</>
	)
}
