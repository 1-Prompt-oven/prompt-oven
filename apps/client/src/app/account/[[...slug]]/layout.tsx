import type { ReactNode } from "react"

export default function Layout({
	children,
}: {
	children: Readonly<ReactNode>
}) {
	return <main>{children}</main>
}
