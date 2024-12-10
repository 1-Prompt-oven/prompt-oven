import type { ReactNode } from "react"
import { QueryProvider } from "@/provider/QueryProvider.tsx"

export const metadata = {
	title: "promptoven 실시간 채팅 앱",
	description: "Next.js와 SSE를 이용한 실시간 채팅 애플리케이션",
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return <QueryProvider>{children}</QueryProvider>
}
