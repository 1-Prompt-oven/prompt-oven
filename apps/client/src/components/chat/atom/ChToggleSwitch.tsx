import { Switch } from "@repo/ui/switch"

interface ToggleSwitchProps {
	checked?: boolean
	onChange?: (checked: boolean) => void
}

export function ChToggleSwitch({
	checked = false,
	onChange,
}: ToggleSwitchProps) {
	return (
		<Switch
			checked={checked}
			onCheckedChange={onChange}
			className="data-[state=checked]:bg-[#75C1D9]"
		/>
	)
}
