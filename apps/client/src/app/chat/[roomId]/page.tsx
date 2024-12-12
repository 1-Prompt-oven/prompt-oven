import type { ChatPageSearchParams } from "@/types/chat/chatComponentTypes.ts"
import ChatPage from "@/components/chat/page/ChatPage.tsx"
import { getMemberUUID } from "@/lib/api/sessionExtractor.ts"

export interface PageSearchParams {
	params: ChatPageSearchParams
}
export default async function Page({ params }: PageSearchParams) {
	const memberUuid = (await getMemberUUID()) ?? ""
	return <ChatPage roomId={params.roomId} memberUuid={memberUuid} />
}
