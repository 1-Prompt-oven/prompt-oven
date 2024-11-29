import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

//Date Formmat like -> at 2.45 PM
export const ReviewDateFormatted = (dateString: string) => {
	const date = new Date(dateString)
	const hours = date.getUTCHours()
	const minutes = date.getUTCMinutes()
	const ampm = hours >= 12 ? "PM" : "AM"
	const formattedHours = hours % 12 || 12
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
	return `at ${formattedHours}.${formattedMinutes} ${ampm}`
}

//Date Format like -> 2024.xx.xx
export const PromptCardDateFormatted = (dateString: string) => {
	const registDate = new Date(dateString)
	return registDate.toLocaleDateString("ko-KR").replace(/\.$/, "")
}

//Regist Date is Today?
export const PromptIsNew = (dateString: string) => {
	return new Date().toDateString() === new Date(dateString).toDateString()
}

//Follower Format
export const formatFollowers = (count: number | undefined) => {
	if (count === undefined) return '0'
	if (count >= 1000) {
		return `${(count / 1000).toFixed(1)}K`
	}
	return count.toString()
}
