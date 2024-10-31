import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import { signInAction } from "@/app/action/auth/signInAction"
import type { authMemberType } from "@/types/auth/authMemberType"

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
		maxAge: 24 * 60 * 60, // 1 day
		updateAge: 24 * 60 * 60, // 24 hours
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				signinEmail: { label: "signinEmail", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(
				credentials: Record<string, string> | undefined,
			): Promise<any> {
				if (!isCredentialsExist(credentials)) return null

				const res = await signInAction({
					signinEmail: credentials!.loginId as string,
					password: credentials!.password as string,
				})

				if (res.ok) {
					const signInReturn = await res.json()
					return signInReturn.res as authMemberType
				} else {
					return null
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log(
				"signIn callback in authOption",
				user,
				account,
				profile,
				email,
				credentials,
			)

			return true
		},
		async jwt({ token, user }) {
			// console.log(
			// 	"\n\n jwt token in authOption : \n\n",
			// 	token,
			// 	"\n\nuser\n\n",
			// 	user
			// )
			return { ...token, ...user }
		},
		async session({ session, token }) {
			// console.log(
			// 	"\n\nsession in authOption\n\n",
			// 	session,
			// 	"\n\ntoken\n\n",
			// 	token
			// )
			session.user = token
			return session
		},
	},
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
		// redirect: "/shop/main"
	},
}

const isCredentialsExist = (
	credentials: Record<string, string> | undefined,
): boolean => {
	if (!credentials) return false
	return !!(credentials.loginId && credentials.password)
}
