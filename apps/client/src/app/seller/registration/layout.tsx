import React from "react"
import AuthProvider from "@/provider/authProvider.tsx"

export default function RegistrationLayout({
	children,
}: {
	children: Readonly<React.ReactNode>
}) {
	return <AuthProvider>{children}</AuthProvider>
}
