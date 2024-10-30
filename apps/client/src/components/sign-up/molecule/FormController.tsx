import React from "react"
import { Controller, Control } from "react-hook-form"
import { Input } from "../atom/Input"

interface FormControllerProps {
	name: string
	control: Control<any>
	type: string
	placeholder: string
	className?: string
}

const FormController: React.FC<FormControllerProps> = ({
	name,
	control,
	type,
	placeholder,
	className = "input",
}) => (
	<Controller
		name={name}
		control={control}
		render={({ field }) => (
			<Input
				{...field}
				type={type}
				placeholder={placeholder}
				className={className}
			/>
		)}
	/>
)

export default FormController
