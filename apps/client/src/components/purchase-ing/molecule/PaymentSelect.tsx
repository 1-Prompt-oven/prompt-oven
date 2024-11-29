import { ChevronDown } from "@repo/ui/lucide"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/select"

const methodGroup = {
	general: "일반 결제",
	eWallet: "E-Wallet",
}

interface PaymentSelectProps {
	// selectedType: keyof typeof methodGroup
	onSelectChange: (value: keyof typeof methodGroup) => void
}

export default function PaymentSelect({
	// selectedType,
	onSelectChange,
}: PaymentSelectProps) {
	return (
		<Select onValueChange={onSelectChange}>
			<SelectTrigger className="h-[50px] rounded-md border border-[#d8d8d8] text-[15px] text-[#969696] focus:ring-0 focus:ring-offset-0 [&>svg]:hidden">
				<div className="flex w-full items-center justify-between">
					<SelectValue placeholder="일반 결제" />
					<ChevronDown className="h-4 w-4 shrink-0 text-[#7e7e7e]" />
				</div>
			</SelectTrigger>
			<SelectContent className="rounded-[10px] !bg-white text-[15px] text-[#7e7e7e] hover:!bg-white">
				<SelectGroup>
					<SelectItem
						value="general"
						className="focus:bg-[#f0efef] focus:text-[#7e7e7e]">
						일반 결제
					</SelectItem>
					<SelectItem
						value="eWallet"
						className="focus:bg-[#f0efef] focus:text-[#7e7e7e]">
						E-Wallet
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
