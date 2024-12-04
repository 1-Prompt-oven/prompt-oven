/* eslint-disable -- Disable ESLint for this file to allow flexible type definitions for next-auth */
import NextAuth from 'next-auth/next';
import type { DefaultSession, DefaultUser } from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: number
      email: string
      accesstoken: string
      refreshtoken: string
      kakaoAccessToken: string
      kakaoRefreshToken: string
      NaverAccessToken: string
      NaverRefreshToken: string
      GoogleAccessToken: string
      GooglefreshToken: string
      nickname: string
      role: string
      memberUUID: string
      profileImage: string
      failed: boolean
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id?: string
    email: string
    accesstoken: string
    refreshtoken: string
    nickname: string
    role: string
    memberUUID: string
    profileImage: string
    failed: boolean
  }
}

