import NextAuth, { DefaultSession, DefaultUser } from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      accesstoken: string
      refreshtoken: string
      nickname: string
      role: string
      memberUUID: string
      failed: boolean
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    accesstoken: string
    refreshtoken: string
    nickname: string
    role: string
    memberUUID: string
    failed: boolean
  }
}