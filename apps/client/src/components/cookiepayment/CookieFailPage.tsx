"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CookieFailPage() {
	const router = useRouter()

	useEffect(() => {
		// 컴포넌트가 마운트될 때 /cart로 이동
		router.push("/account?view=cookie")
	}, [router])

	return <div>Redirecting to purchase page</div>
}
