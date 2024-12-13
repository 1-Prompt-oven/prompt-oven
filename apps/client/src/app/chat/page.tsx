import type { ChatPageSearchParams } from "@/types/chat/chatComponentTypes.ts"
import ChatPage from "@/components/chat/page/ChatPage.tsx"
import { getMemberUUID } from "@/lib/api/sessionExtractor.ts"

export type PageSearchParams = ChatPageSearchParams
export default async function Page({
	searchParams,
}: {
	searchParams: PageSearchParams
}) {
	const memberUuid = (await getMemberUUID()) ?? ""
	return <ChatPage roomId={searchParams.roomId} memberUuid={memberUuid} />
}
