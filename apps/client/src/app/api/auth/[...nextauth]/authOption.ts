import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import { signInByAuth } from "@/action/auth/OAuthSignInAction.ts";

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
            async authorize(credentials): Promise<User | null> {
							 /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- eslint rule complict */
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const response = await signInByAuth({
                    email: credentials.email,
                    password: credentials.password,
                });

                return {
                    id: response.result.memberUUID,
                    accesstoken: response.result.accesstoken,
                    refreshtoken: response.result.refreshtoken,
                    email: credentials.email,
                    nickname: response.result.nickname,
                    memberUUID: response.result.memberUUID,
                    role: response.result.role,
                    failed: false,
                };
            },
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
							// eslint-disable-next-line no-console -- This is a client-side only log
            console.log("signIn :", user, account, profile);
            return true;
        },
        async jwt({ token, user }) {
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- user might be undefined in some edge cases
            if (user) {
                token.id = user.id;
                token.accesstoken = user.accesstoken;
                token.refreshtoken = user.refreshtoken;
                token.nickname = user.nickname;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                accesstoken: token.accesstoken,
                refreshtoken: token.refreshtoken,
                nickname: token.nickname,
                role: token.role,
            };
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url === "/error") {
                return `${baseUrl}/sign-in`;
            }

            if (url === "/sign-up") {
                return `${baseUrl}/sign-in`;
            }
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },
    pages: {
        signIn: "/sign-in",
        error: "/error",
    },
};
