"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { delay } from "@/lib/utils.ts"
import PageLoader from "@/components/seller/atom/PageLoader.tsx"

interface SellerRegistrationTemplateProps {
	isSeller: boolean
	children: React.ReactNode
}

function SellerRegistrationTemplate({
	isSeller,
	children,
}: SellerRegistrationTemplateProps) {
	const router = useRouter()
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		delay(2000).then(() => {
			if (isSeller) {
				router.push("/")
			}
			setLoading(false)
		})
	}, [isSeller, router])
	return <>{loading || isSeller ? <PageLoader /> : children}</>
}

export default SellerRegistrationTemplate
