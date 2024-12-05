import { forwardRef } from "react"
import type { HTMLProps } from "react"
import type { InputProps } from "@repo/ui/input"
import { Input } from "@repo/ui/input"

interface SignInInputProps extends InputProps {
	containerProps?: HTMLProps<HTMLDivElement>
}

const NicknameInput = forwardRef<HTMLInputElement, SignInInputProps>(
	({ containerProps = {}, ...props }, ref) => {
		return (
			<div
				{...containerProps}
				className={`relative ${containerProps.className ?? ""}`}>
				<Input
					ref={ref}
					variant="nickname"
					{...props}
					className={`${props.className}`}
				/>
			</div>
		)
	},
)

NicknameInput.displayName = "NickName"
export default NicknameInput
