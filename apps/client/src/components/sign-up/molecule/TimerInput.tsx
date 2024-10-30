"use client"

import React, { useEffect, useState } from "react"
import { Control, Controller } from "react-hook-form"
import ValidateButton from "../atom/Button"

interface TimerInputProps {
	control: Control<any>
}

const TimerInput: React.FC<TimerInputProps> = ({ control }) => {
	const [time, setTime] = useState("00:00")
	const [isCounting, setIsCounting] = useState(false)

	// 타이머 기능
	useEffect(() => {
		let timer: NodeJS.Timeout | null = null
		if (isCounting) {
			let minutes = 1
			let seconds = 0

			timer = setInterval(() => {
				if (seconds === 0) {
					if (minutes === 0) {
						clearInterval(timer!)
						setIsCounting(false)
						return
					}
					minutes--
					seconds = 59
				} else {
					seconds--
				}
				setTime(
					`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
				)
			}, 1000)
		}
		return () => {
			if (timer !== null) clearInterval(timer)
		}
	}, [isCounting])

	// 타이머 시작 핸들러
	const startCountdown = () => {
		setTime("01:00")
		setIsCounting(true)
	}

	return (
		<div>
			<label>E-mail validation</label>
			<div className="email-validation flex items-center justify-between">
				<Controller
					name="emailValidation"
					control={control}
					render={({ field }) => (
						<div className="relative w-full">
							<input
								{...field}
								type="text"
								placeholder="Value"
								className="input w-full pr-12"
							/>
							<span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400">
								{time}
							</span>
						</div>
					)}
				/>
				<ValidateButton text="check" onClick={startCountdown} />
			</div>
		</div>
	)
}

export default TimerInput
