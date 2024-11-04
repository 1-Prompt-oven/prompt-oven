"use client"

import React, { useEffect, useImperativeHandle, useRef, useState } from "react"
import { Input } from "../atom/Input"

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label_name?: string
	is_error?: boolean
}

// !! useImperativeHandle(ref, () => inputRef.current as HTMLInputElement) 를 추가 안했는데도 react-form-hook에서 register 하는데 문제없이 동작한다... 왜지??
const LabelInput = React.forwardRef<HTMLInputElement, LabelInputProps>(
	({ label_name, is_error = false, ...props }, ref) => {
		const inputRef = useRef<HTMLInputElement>(null)
		const [inputValue, setInputValue] = useState<string>("")

		useEffect(() => {
			setInputValue(inputRef.current?.value || "")

			const handleInputChange = () => {
				setInputValue(inputRef.current?.value || "")
			}
			const inputElement = inputRef.current
			inputElement?.addEventListener("input", handleInputChange)

			return () => {
				inputElement?.removeEventListener("input", handleInputChange)
			}
		}, [])

		useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

		return (
			<fieldset
				className="
        relative flex w-full
        flex-col justify-between gap-1 pt-[16px]
        focus:outline-none
      "
				onClickCapture={() => {
					inputRef.current?.focus()
				}}>
				<Input
					ref={inputRef}
					name={`${props.name ?? "labelInput"}`}
					{...props}
					className={`
            border-b-sb-gray-0 focus:border-b-sb-green-100 peer/input
            h-[40px] w-full rounded-none border-0 border-b
            bg-transparent
            ${is_error && `border-b-sb-red-100 focus:!border-b-sb-red-100`}
            ${props.className}
          `}></Input>
				<label
					htmlFor={`${props.name ?? "labelInput"}`}
					className={`
          text-sb-gray-200 peer-focus/input:text-sb-black-100
          absolute select-none transition-all
          duration-100 peer-focus/input:left-0
          peer-focus/input:top-1 peer-focus/input:text-xs
          ${inputValue ? "left-0 top-1 text-xs" : "left-1 top-7 text-base"}
        `}>
					{label_name}
				</label>
			</fieldset>
		)
	},
)

LabelInput.displayName = "LabelInput"

export default LabelInput
