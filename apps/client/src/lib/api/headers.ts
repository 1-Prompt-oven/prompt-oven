import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption"

export async function getAuthHeaders(): Promise<HeadersInit> {
    "use server"
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }

    const session = await getServerSession(authOptions)
    if (session) {
        const userObj = session as { user?: { accesstoken?: unknown } }
        const accessToken = userObj.user?.accesstoken

        if (typeof accessToken === 'string') {
            headers.Authorization = `Bearer ${accessToken}`
        }
    }

    return headers
} 