import { FileText } from "@repo/ui/lucide"

interface FileItemProps {
	name: string
	size: string
}

export function ChFileItem({ name, size }: FileItemProps) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-1.5">
				<FileText className="h-5 w-5 text-[#A3A3A3]" />
				<span className="text-base text-[#A3A3A3]">{name}</span>
			</div>
			<span className="text-xs text-[#0D062D]">{size}</span>
		</div>
	)
}
