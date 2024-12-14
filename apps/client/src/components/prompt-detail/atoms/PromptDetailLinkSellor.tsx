import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar"

interface PromptDetailLinkSellorProps {
	memberNickname: string | undefined
	memberProfileImage: string | undefined
}

export default function PromptDetailLinkSellor({
	memberNickname,
	memberProfileImage,
}: PromptDetailLinkSellorProps) {
	return (
		<Link href={`/profile/seller/${memberNickname}`}>
			<div className="flex items-center rounded-full bg-gradient-to-r from-[#ca8feb] to-[#7f24af] p-2 pr-4 hover:opacity-90">
				<Avatar className="h-8 w-8">
					<AvatarImage src={memberProfileImage} alt={memberNickname} />
					<AvatarFallback>AU</AvatarFallback>
				</Avatar>
				<p className="ml-2 whitespace-nowrap text-white">
					<span className="font-medium">@</span>
					<span className="font-normal">{memberNickname}</span>
				</p>
			</div>
		</Link>
	)
}
