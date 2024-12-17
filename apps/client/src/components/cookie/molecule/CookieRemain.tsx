"use client"

import React, { useEffect, useState } from "react"
import { getCookieLatest } from "@/action/cookie/cookieAction"

function CookieRemain() {
	const [cookieAmount, setCookieAmount] = useState<number>(0)
	const [isUser, setIsUser] = useState<boolean>(true)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchCookieAmount = async () => {
			try {
				const { isUser: userStatus, count } = await getCookieLatest()
				setIsUser(userStatus)
				setCookieAmount(count)
			} catch (error) {
				setIsUser(false)
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

	if (!isUser) {
		return <p>유저 정보를 확인할 수 없습니다.</p>
	}

	return (
		<div className="text-white">
			<p>현재 쿠키 잔여량: {cookieAmount}</p>
		</div>
	)
}

export default CookieRemain
