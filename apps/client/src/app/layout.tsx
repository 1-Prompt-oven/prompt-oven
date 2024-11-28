import React from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/authOption"
import "./globals.css"
import "@repo/ui/styles.css"
import type { Metadata } from "next"
import { roboto, sora } from "@/app/fonts.ts"
import MainHeader from "@/components/common/molecule/MainHeader.tsx"
import { SideMenuToggleStoreProvider } from "@/provider/account/sideMenuStoreProvider.tsx"
import AuthContextProvider from "@/provider/AuthContextProvider"

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
export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)
	const isAuth = Boolean(session?.user)
	return (
		<html lang="en">
			<head>
				<meta name="mobile-web-app-capable" content="yes" />
			</head>
			<body
				className={`${sora.variable} ${roboto.variable} ${sora.className} bg-po-black-200`}>
				<AuthContextProvider isAuth={isAuth}>
					<SideMenuToggleStoreProvider>
						<MainHeader />
						{children}
					</SideMenuToggleStoreProvider>
				</AuthContextProvider>
			</body>
		</html>
	)
}
