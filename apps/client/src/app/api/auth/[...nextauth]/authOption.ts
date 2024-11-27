// eslint-disable-next-line import/no-named-as-default -- This is a server-side only import
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import NaverProvider from "next-auth/providers/naver"
import KakaoProvider from "next-auth/providers/kakao"
import { signIn } from "@/action/auth/OAuthSignInAction.ts"

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
		maxAge: 24 * 60 * 60, // 1 day
		updateAge: 24 * 60 * 60, // 24 hours
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "password", type: "password" },
			},
			async authorize(credentials): Promise<any> {
				if (!credentials?.email || !credentials?.password) {
					return null
				}
				const res = await signIn(credentials);
				return res.result
			}
		}),
		NaverProvider({
			clientId: process.env.NAVER_CLIENT_ID || "",
			clientSecret: process.env.NAVER_CLIENT_SECRET || "",
		}),
		KakaoProvider({
			clientId: process.env.KAKAO_CLIENT_ID || "",
			clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async signIn({ user, account, profile }) {
			// eslint-disable-next-line no-console -- This is a server-side only log
			// console.log("signIn :", user, account, profile)

			// // 소셜 로그인으로 로그인 시도 시, 로그인 성공 여부를 반환
			// if (account?.provider) {
			// 	const OauthSignInResponse = await signInByOAuth({
			// 		provider: account.provider,
			// 		providerID: account.providerAccountId,
			// 		email: user.email || "",
			// 	})

			// 	// redirect()
			// 	if (OauthSignInResponse.failed) {
			// 		// const registerByOAuthResponse = await registerOauthMember({
			// 		// 	email: user.email || "",
			// 		//
			// 		// 	provider: account.provider,
			// 		// 	providerId: account.providerAccountId,
			// 		// })
			// 	}
			// 	// eslint-disable-next-line no-console -- This is a server-side only log
			// 	console.log("server data", OauthSignInResponse)
			// 	return true
			// }
			// Credential(이메일과 비밀번호)로 로그인 시도 시, 로그인 성공 여부를 반환

			return true
		},
		async jwt({ token, user }) {
      return { ...token, ...user };
    },

		async session({ session, token }) {
      session.user = token as any;
      return session;
    },

		async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
	},
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
		// redirect: "/shop/main"
	},
}
