import React from "react"
import "./globals.css"
import "@repo/ui/styles.css"
import type { Metadata } from "next"
import { roboto, sora } from "@/app/fonts.ts"
// import MainHeader from "@/components/main/molecule/MainHeader.tsx"
import MainHeader from "@/components/common/molecule/MainHeader.tsx"
import { AuthSessionProvider } from "@/provider/authSessionProvider.tsx"
import { SideMenuToggleStoreProvider } from "@/provider/account/sideMenuStoreProvider.tsx"

export const metadata: Metadata = {
	title: "Prompt Oven",
	description: "Make your own writing prompts.",
	icons: {
		icon: [
			{
				rel: "icon",
				type: "image/png",
				sizes: "48x48",
				url: "/favicon-48x48.png",
			},
			{ rel: "icon", type: "image/svg+xml", url: "/favicon.svg" },
		],
		shortcut: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
	manifest: "/site.webmanifest",
	appleWebApp: {
		title: "Prompt Oven",
	},
}
export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<head>
				<meta name="mobile-web-app-capable" content="yes" />
			</head>
			<body
				className={`${sora.variable} ${roboto.variable} ${sora.className} bg-po-black-200`}>
				<AuthSessionProvider>
					<SideMenuToggleStoreProvider>
						<MainHeader />
						<div className="relative pt-20">{children}</div>
					</SideMenuToggleStoreProvider>
				</AuthSessionProvider>
			</body>
		</html>
	)
}
