import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import { signInByAuth } from "@/action/auth/OAuthSignInAction.ts";
import { Session } from "inspector/promises";

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
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const response = await signInByAuth({
                    email: credentials.email,
                    password: credentials.password,
                });

                return {
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
            console.log("signIn :", user, account, profile);
            return true;
        },
        async jwt({ token, user }) {
            return { ...token, ...user };
          },
      
              async session({ session, token }) {
            session.user = token;
            return session;
          },
      
              async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
          },
    },
    pages: {
        signIn: "/sign-in",
        error: "/error",
    },
};
