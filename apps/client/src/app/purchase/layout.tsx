import React from "react"
import MainFooter from "@/components/main/organism/MainFooter"

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			{children}
			<MainFooter />
		</>
	)
}
