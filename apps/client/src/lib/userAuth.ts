import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption.ts"

export interface IsUserLoggedInType {
	isAuth: boolean
	role: string
}
export async function isUserLoggedIn(): Promise<IsUserLoggedInType> {
	"use server"
	const session = await getServerSession(authOptions)
	return {
		isAuth: Boolean(session?.user),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- safe to assume that role is a string
		role: session?.user?.role as string,
	}
}

export type UserAuthType = "admin" | "seller" | "member" | "guest"
export async function getUserAuth(): Promise<UserAuthType> {
	"use server"
	const session = await getServerSession(authOptions)
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- safe to assume that role is a string
	const role = session?.user?.role as string
	const isAuth = Boolean(session?.user)

	if (isAuth && role === "seller") {
		return "seller"
	} else if (isAuth && role === "admin") {
		return "admin"
	} else if (isAuth && role === "member") {
		return "member"
	}
	return "guest"
}
