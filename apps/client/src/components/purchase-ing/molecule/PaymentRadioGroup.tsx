import { Label } from "@repo/ui/label"
import { RadioGroup, RadioGroupItem } from "@repo/ui/radio-group"

interface PaymentRadioGroupProps {
	currentMethodGroup: {
		icon: JSX.Element
		iconNone: JSX.Element
		label: string
	}[]
	selectedPayment: string | undefined
	onChangePayment: (value: string) => void
}

export default function PaymentRadioGroup({
	currentMethodGroup,
	selectedPayment,
	onChangePayment,
}: PaymentRadioGroupProps) {
	return (
		<RadioGroup
			value={selectedPayment}
			onValueChange={onChangePayment}
			className="space-y-4"
			name="paymentMethod">
			{currentMethodGroup.map((item) => (
				<div key={item.label} className="flex items-center space-x-2">
					<RadioGroupItem
						value={item.label}
						id={item.label}
						className={`border-[#7e7e7e] ${selectedPayment === item.label ? "text-black" : "text-[#7e7e7e]"}`}
					/>
					<Label
						htmlFor={item.label}
						className={`flex gap-4 text-sm ${selectedPayment === item.label ? "text-black" : "text-[#7e7e7e]"}`}>
						{selectedPayment === item.label ? item.icon : item.iconNone}
						{item.label}
					</Label>
				</div>
			))}
		</RadioGroup>
	)
}
