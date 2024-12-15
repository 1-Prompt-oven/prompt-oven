import React from "react"
import { getServerSession } from "next-auth"
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
			<div className="flex flex-col pl-2">
				<ShowEmail email={email} />
				<NicknameModifySection memberUUID={memberUUID} />
				<LogoutButton />
				<DeleteAccount />
			</div>
		</section>
	)
}
