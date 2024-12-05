import React from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption"
import LogoutButton from "../atom/LogoutButton"
import NicknameModifySection from "../molecule/NicknameModifySection"
import ShowEmail from "../atom/ShowEmail"
import DeleteAccount from "../atom/DeleteAccount"

export default async function Settings() {
	const session = await getServerSession(authOptions)
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guarantee session is not null
	const { memberUUID, email } = session!.user

	return (
		<section className="flex flex-col items-center justify-center py-10">
			<ShowEmail email={email} />
			<NicknameModifySection memberUUID={memberUUID} />
			<LogoutButton />
			<DeleteAccount />
		</section>
	)
}
