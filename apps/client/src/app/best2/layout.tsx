import React from "react"
import MainFooter from "@/components/main/organism/MainFooter"

export default function layout({
	children,
}: {
	children: Readonly<React.ReactNode>
}) {
	return (
		<>
			{children}
			<MainFooter />
		</>
	)
}
