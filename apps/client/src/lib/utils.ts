import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

//Date Formmat like -> at 2.45 PM
export const ReviewDateFormatted = (dateString: string) => {
	const timeZ = dateString.includes("Z") ? dateString : `${dateString}Z`
	const date = new Date(timeZ)
	const utcHours = date.getUTCHours()
	const utcMinutes = date.getUTCMinutes()
	const kstHours = (utcHours + 9) % 24
	const kstMinutes = utcMinutes
	const ampm = kstHours >= 12 ? "PM" : "AM"
	const formattedHours = kstHours % 12 || 12
	const formattedMinutes = kstMinutes < 10 ? `0${kstMinutes}` : kstMinutes

	return `at ${formattedHours}.${formattedMinutes} ${ampm}`
}

//Date Format like -> 2024.xx.xx
export const PromptCardDateFormatted = (dateString: string) => {
	const registDate = new Date(dateString)
	return registDate.toLocaleDateString("ko-KR").replace(/\.$/, "")
}

//Reivew - If not Today, add year.month.day
export const getCheckToday = (dateString: string) => {
	const timeZ = dateString.includes("Z") ? dateString : `${dateString}Z`
	const updatedDate = new Date(timeZ)
	const today = new Date()

	// 오늘의 연도, 월, 일 가져오기
	const isSameYear = updatedDate.getFullYear() === today.getFullYear()
	const isSameMonth = updatedDate.getMonth() === today.getMonth()
	const isSameDate = updatedDate.getDate() === today.getDate()

	if (isSameYear && isSameMonth && isSameDate) {
		return null
	}
	// 오늘이 아닐 경우 "xxxx.xx.xx" 형식으로 반환
	const year = String(updatedDate.getFullYear()).padStart(4, "0")
	const month = String(updatedDate.getMonth() + 1).padStart(2, "0")
	const date = String(updatedDate.getDate()).padStart(2, "0")

	return `${year}.${month}.${date}`
}

//Regist Date is Today?
export const PromptIsNew = (dateString: string) => {
	return new Date().toDateString() === new Date(dateString).toDateString()
}

//Follower Format
export const formatFollowers = (count: number | undefined) => {
	if (count === undefined) return "0"
	if (count >= 1000) {
		return `${(count / 1000).toFixed(1)}K`
	}
	return count.toString()
}

export const formatDate = (dateString: string) => {
	return dateString.split("T")[0]
}

// delay function
export function delay(ms: number) {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, ms)
	})
}

// change string boolean into boolean type
export function stringToBoolean(str: string) {
	if (!str) return false
	return str.toLowerCase() === "true"
}

// get KR Time
export function getKoreanTime() {
	const now = new Date()
	const kstOffset = 9 * 60 // KST는 UTC+9
	const kstDate = new Date(now.getTime() + kstOffset * 60 * 1000)

	return kstDate
}
