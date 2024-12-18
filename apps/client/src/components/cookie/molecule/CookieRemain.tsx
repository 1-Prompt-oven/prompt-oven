"use client"

import React, { useEffect, useState } from "react"
import { Badge } from "@repo/ui/badge"
import { getCookieLatest } from "@/action/cookie/cookieAction"

function CookieRemain() {
	const [cookieAmount, setCookieAmount] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchCookieAmount = async () => {
			try {
				const { count } = await getCookieLatest()
				setCookieAmount(count)
			} catch (error) {
				// eslint-disable-next-line no-console -- This is a server-side only log
				console.error("Failed to fetch cookie amount:", error)
				setCookieAmount(0)
			} finally {
				setLoading(false)
			}
		}

		fetchCookieAmount()
	}, [])

	if (loading) {
		return <p>로딩 중...</p>
	}

	return (
		<div className="text-white">
			<Badge
				variant="outline"
				className="border-purple-500/50 px-2 py-1 text-base font-bold text-purple-300">
				My Cookie : {cookieAmount}
			</Badge>
		</div>
	)
}

export default CookieRemain
