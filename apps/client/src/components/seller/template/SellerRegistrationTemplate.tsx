"use client"

import React, { useEffect, useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { useRouter } from "next/navigation"
import { delay } from "@/lib/utils.ts"

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
	return (
		<>
			{loading || isSeller ? (
				<div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center">
					<ThreeDots
						visible
						width="100"
						height="80"
						radius="9"
						color="#ffffff"
						ariaLabel="three-dots-loading"
						wrapperStyle={{}}
						wrapperClass=""
					/>
				</div>
			) : (
				children
			)}
		</>
	)
}

export default SellerRegistrationTemplate
