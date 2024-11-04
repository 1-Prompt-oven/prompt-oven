"use client"

import React, { useState } from "react"
import { IconToggle } from "../atom/IconToggle"
import { Input } from "@repo/ui/input"

export const PasswordInput: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div className="relative">
			<Input
				type={showPassword ? "text" : "password"}
				placeholder="Password"
				className="h-[59px] bg-[#333333] px-8 text-white/70"
			/>
			<IconToggle
				show={showPassword}
				onClick={() => setShowPassword(!showPassword)}
			/>
		</div>
	)
}
