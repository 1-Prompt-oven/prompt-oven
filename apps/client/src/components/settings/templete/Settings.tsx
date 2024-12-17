import React from "react"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption"
import LogoutButton from "../atom/LogoutButton"
import NicknameModifySection from "../molecule/NicknameModifySection"
import ShowEmail from "../atom/ShowEmail"
import DeleteAccount from "../atom/DeleteAccount"
import SettingsTitle from "../atom/SettingsTitle"

export default async function Settings() {
	const session = await getServerSession(authOptions)
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guarantee session is not null
	const { memberUUID, email } = session!.user

	return (
		<section className="container mx-auto rounded-md bg-[#111111] py-10">
			<SettingsTitle />
			<div className="flex flex-row items-start justify-between">
				{/* 왼쪽 섹션 */}
				<div className="flex flex-col space-y-4 pl-2">
					<ShowEmail email={email} />
					<NicknameModifySection memberUUID={memberUUID} />
					<LogoutButton />
					<DeleteAccount />
				</div>
				{/* 오른쪽 이미지 */}
				<div className="mt-10">
					<Image
						src="/img/settings/settings.png"
						alt="Settings Illustration"
						width={400} // 이미지 너비
						height={400} // 이미지 높이
						priority
						style={{ width: "auto", height: "auto" }} // 비율 유지
						className="rounded-md"
					/>
				</div>
			</div>
		</section>
	)
}
