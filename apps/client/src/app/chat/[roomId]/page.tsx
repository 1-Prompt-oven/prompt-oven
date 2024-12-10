import type { ChatPageSearchParams } from "@/types/chat/chatComponentTypes.ts"
import ChatPage from "@/components/chat/page/ChatPage.tsx"

export interface PageSearchParams {
	params: ChatPageSearchParams
}
export default function Page({ params }: PageSearchParams) {
	return <ChatPage roomId={params.roomId} />
}
