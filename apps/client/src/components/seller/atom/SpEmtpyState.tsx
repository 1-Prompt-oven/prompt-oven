import { PackageX } from "@repo/ui/lucide"

export function SpEmptyState() {
	return (
		<div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-white/15 bg-[#111111]">
			<PackageX className="mb-4 h-16 w-16 text-[#E2ADFF]" />
			<h3 className="mb-2 text-xl font-semibold text-white">
				No products found
			</h3>
			<p className="max-w-[300px] text-center text-sm text-gray-400">
				There are no products available. Try changing your search or filter
				criteria.
			</p>
		</div>
	)
}
