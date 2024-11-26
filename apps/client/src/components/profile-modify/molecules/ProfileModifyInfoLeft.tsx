import { Button } from "@repo/ui/button"
import { DropdownMenu, DropdownMenuTrigger } from "@repo/ui/dropdown-menu"
import { MoreVertical, Star } from "@repo/ui/lucide"
import ProfileModifyName from "../atoms/ProfileModifyName"

interface MemberLeftProps {
	hashTag: string | undefined
	nickname: string | undefined
	email: string | undefined
	joined: string
}

export default function ProfileModifyInfoLeft({
	hashTag,
	nickname,
	email,
	joined,
}: MemberLeftProps) {
	return (
		<div className="flex max-w-[160px] flex-grow flex-col justify-between gap-1 xl:gap-3">
			<ProfileModifyName
				hashTag={hashTag}
				nickname={nickname}
				email={email}
				joined={joined}
			/>

			<div className="mt-4 flex items-center gap-2 md:mt-0">
				<Button
					type="button"
					variant="ghost"
					className="font-mulish bg-white/50 p-1 font-semibold text-white hover:bg-white/60 md:p-4">
					<Star className="mx-2" />
					<span className="mr-2 hidden lg:block">Follow</span>
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="hover:bDropdownMenug-white/60 w-10 bg-white/50 p-0">
							<MoreVertical className="h-4 w-4 text-white" />
						</Button>
					</DropdownMenuTrigger>
				</DropdownMenu>
			</div>
		</div>
	)
}
