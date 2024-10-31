"use client"

import React, { useCallback, useState } from "react"
import Link from "next/link"

interface IconButtonProps {
	Icon: React.FC<{
		width?: number | string
		height?: number | string
		color?: string
	}>
	href: string
}

function IconButton({ Icon, href }: IconButtonProps) {
	const [isHovered, setIsHovered] = useState(false)

	const handleMouseEnter = useCallback(() => setIsHovered(true), [])
	const handleMouseLeave = useCallback(() => setIsHovered(false), [])

	return (
		<Link
			href={href}
			className="group-ficon flex h-[50px] w-[50px] items-center justify-center rounded-md bg-[#1B1B1B] hover:bg-[#FCB808]"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<Icon color={isHovered ? "#111111" : "#ffffff"} />
		</Link>
	)
}

export default IconButton
