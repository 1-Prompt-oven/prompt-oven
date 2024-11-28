"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// @ts-expect-error -- No types available
interface PriceStepperProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	min: number
	max: number
	step: number
	value: number
	currency?: string
	toFixed?: number
	onChange: (value: number) => void
}

const PriceStepper = React.forwardRef<HTMLInputElement, PriceStepperProps>(
	(
		{
			className,
			currency = "₩",
			toFixed = 0,
			min,
			max,
			step,
			value,
			onChange,
			...props
		},
		ref,
	) => {
		const percentage = ((value - min) / (max - min)) * 100
		const stepLength = (max - min) / step + 1

		return (
			<div className={cn("w-full", className)}>
				<div className="relative mt-9 inline-block h-[0.625rem] w-full">
					<input
						type="range"
						min={min}
						max={max}
						step={step}
						value={value}
						onChange={(e) => onChange(parseFloat(e.target.value))}
						className="absolute top-0 h-[0.625rem] w-full cursor-pointer opacity-0"
						ref={ref}
						{...props}
					/>
					<div
						className="pointer-events-none absolute bottom-3 left-0 flex min-w-max justify-end text-base"
						style={{
							width: `calc(${percentage}% + ${percentage === 100 ? "0rem" : "0.625rem"})`,
						}}>
						<div className="relative flex flex-col items-center font-[500]">
							<div className="absolute bottom-2 max-w-max text-white">
								<span className="whitespace-nowrap">
									{value.toFixed(toFixed)}
									{currency}
								</span>
							</div>
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="10"
									height="9"
									viewBox="0 0 10 9"
									fill="none">
									<path
										d="M5.84615 7.65655C5.45392 8.2793 4.54608 8.2793 4.15385 7.65655L0.769348 2.28294C0.349929 1.61702 0.828507 0.75 1.6155 0.75L8.3845 0.750001C9.17149 0.750001 9.65007 1.61702 9.23065 2.28294L5.84615 7.65655Z"
										fill="#5F0BA6"
									/>
								</svg>
							</div>
						</div>
					</div>
					<div className="pointer-events-none absolute bottom-0 h-[0.625rem] w-full">
						<div className="relative flex items-center justify-between overflow-hidden rounded-md bg-[#2c283f]">
							<div
								className="absolute z-[1] h-[0.625rem] rounded-md bg-[linear-gradient(90deg,#DC0BAE_0%,#500CA6_111.57%)]"
								style={{
									width: `calc(${percentage}% + ${percentage === 100 ? "0rem" : "0.625rem"}`,
								}}
							/>
							{Array.from({ length: stepLength }).map((_, index) => (
								<div
									// eslint-disable-next-line react/no-array-index-key -- it's a static array
									key={index}
									className="relative flex h-[0.625rem] justify-center rounded-[50%] bg-po-black-50">
									<div className="rounded-5 h-full w-[0.625rem]" />
								</div>
							))}
						</div>
					</div>
				</div>
				<span className="relative mt-1 flex w-full justify-between text-white">
					<span className="absolute -bottom-6 left-0 translate-x-[-50%]">
						{min.toFixed(toFixed)}
						{currency}
					</span>
					<span className="absolute -bottom-6 right-0 translate-x-[50%]">
						{max.toFixed(toFixed)}
						{currency}
					</span>
				</span>
			</div>
		)
	},
)
PriceStepper.displayName = "PriceStepper"

export { PriceStepper }
