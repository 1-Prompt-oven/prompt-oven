import Link from "next/link"
import { Button } from "@repo/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu"
import { MoreVertical, Star } from "@repo/ui/lucide"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"
import { matchUser } from "@/lib/api/sessionExtractor"
import ProfileName from "../atoms/info/ProfileName"

interface MemberLeftProps {
	memberData: ProfileMemberInfoType
}

export default async function ProfileInfoLeft({ memberData }: MemberLeftProps) {
	return (
		<div className="flex w-full flex-grow flex-col justify-between gap-1 xs:max-w-[160px]">
			<ProfileName memberData={memberData} />

			<div className="mt-4 flex items-center justify-end gap-2 xs:!mt-0 xs:justify-start">
				<Button
					variant="ghost"
					className="font-mulish bg-white/50 p-1 font-semibold text-white hover:bg-white/60 md:p-4">
					<Star className="mx-2" />
					<span className="mr-2 block">Follow</span>
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="hover:white/60 w-10 bg-white/50 p-0">
							<MoreVertical className="h-4 w-4 text-white" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						className="bg-[#ead4ff] font-semibold text-[#3a3a3a]">
						{(await matchUser(memberData.memberUUID)) ? (
							<DropdownMenuItem>
								{/* <Link href={`/profile/modify/${memberData.nickname}`}> */}
								<Link href="/account?view=profile-modify">
									<p>개인정보 수정</p>
								</Link>
							</DropdownMenuItem>
						) : null}
						<DropdownMenuItem>
							<Link href="/Report">
								<p>신고</p>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}
