"use client"
import React, { useEffect, useState } from "react"
import ToTopIcon from "./icon/ToTopIcon"

export default function ToTopButton({
	moveWithBottomNav = false,
}: {
	moveWithBottomNav?: boolean
}) {
	const [isVisible, setIsVisible] = useState(false)

	const buttonClasses =
		"fixed right-[15px] h-12 w-12 z-[48] flex items-center justify-center rounded-full"
	let visibilityClasses = ""

	if (moveWithBottomNav) {
		visibilityClasses = isVisible
			? "bottom-[16px] block opacity-100"
			: "bottom-[-16px] opacity-0"
	} else {
		visibilityClasses = isVisible
			? "bottom-[30px] block opacity-100"
			: "bottom-[-30px] opacity-0"
	}

	const handleScroll = () => {
		if (window.scrollY > 0) {
			setIsVisible(true)
		} else {
			setIsVisible(false)
		}
	}

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)
		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])
	return (
		<button
			type="button"
			onClick={scrollToTop}
			className={`${buttonClasses} ${visibilityClasses}`}
			style={{
				transitionProperty: "visibility, opacity, bottom",
				transitionDuration: "0.1s, 0.4s, 0.45s",
			}}>
			<ToTopIcon />
			<span className="sr-only">맨 위로</span>
		</button>
	)
}
