import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption"

// Function to get and validate server session
export async function getAccessToken(): Promise<string | null> {
    "use server"
    const session = await getServerSession(authOptions)
    
    if (session) {
        const userObj = session as { user?: { accesstoken?: unknown } }
        const accessToken = userObj.user?.accesstoken

        if (typeof accessToken === 'string') {
            return accessToken
        }
    }
    return null
}

export async function getEmail(): Promise<string | null> {
    "use server"
    const session = await getServerSession(authOptions)
    if (session) {
        const userObj = session as { user?: { email?: unknown } }
        const email = userObj.user?.email

        if (typeof email === 'string') {
            return email
        }
    }
    return null
}

export async function getMemberUUID(): Promise<string | null> {
    "use server"
    const session = await getServerSession(authOptions)
    if (session) {
        const userObj = session as { user?: { memberUUID?: unknown } }
        const memberUUID = userObj.user?.memberUUID

        if (typeof memberUUID === 'string') {
            return memberUUID
        }
    }
    return null
}

export async function getRole(): Promise<string | null> {
    "use server"
    const session = await getServerSession(authOptions)
    if (session) {
        const userObj = session as { user?: { role?: unknown } }
        const role = userObj.user?.role

        if (typeof role === 'string') {
            return role
        }
    }
    return null
}       

export async function getNickname(): Promise<string | null> {
    "use server"
    const session = await getServerSession(authOptions)
    if (session) {
        const userObj = session as { user?: { nickname?: unknown } }
        const nickname = userObj.user?.nickname

        if (typeof nickname === 'string') {
            return nickname
        }
    }
    return null
}

export async function getRefreshToken(): Promise<string | null> {
    "use server"
    const session = await getServerSession(authOptions)
    if (session) {
        const userObj = session as { user?: { refreshtoken?: unknown } }
        const refreshToken = userObj.user?.refreshtoken

        if (typeof refreshToken === 'string') {
            return refreshToken
        }
    }
    return null
}

