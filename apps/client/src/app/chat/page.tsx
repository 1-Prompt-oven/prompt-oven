import type { ChatPageSearchParams } from "@/types/chat/chatComponentTypes.ts"
import ChatPage from "@/components/chat/page/ChatPage.tsx"
import { getMemberUUID } from "@/lib/api/sessionExtractor.ts"
import { getChatRoom } from "@/action/chat/chatAction.ts"
import { getProfileMemberInfoByUuid } from "@/action/profile/getProfileData.ts"
import type { ChatRoom } from "@/types/chat/chatTypes.ts"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes.ts"

export type PageSearchParams = ChatPageSearchParams
export default async function Page({
	searchParams,
}: {
	searchParams: PageSearchParams
}) {
	const memberUuid = (await getMemberUUID()) ?? ""

	let chatRoom: ChatRoom = {} as ChatRoom
	let partnerProfile: ProfileMemberInfoType = {} as ProfileMemberInfoType

	if (searchParams.roomId) {
		chatRoom = (
			await getChatRoom({ roomId: searchParams.roomId, userUuid: memberUuid })
		).result
		partnerProfile = await getProfileMemberInfoByUuid(chatRoom.partnerUuid)
	}

	return (
		<ChatPage
			chatRoom={chatRoom}
			memberUuid={memberUuid}
			partnerProfile={partnerProfile}
		/>
	)
}
